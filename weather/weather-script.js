$(document).ready(function(){

  weather.init();

});

 var weather = (function(){

     /*= cache=*/
   
     var search = $("#search"),
     form = $("form");

     function init(){
         form.on("submit",Submit);
     }
     function Submit(event){
         event.preventDefault();
         var location = search.val();
         var currentPath = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=13c5f087963ccabe717f773a5d0038fb`;
         var days5 = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${location}d&mode=json&cnt=7&units=metric&APPID=13c5f087963ccabe717f773a5d0038fb`;
         var forecast16 = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&APPID=13c5f087963ccabe717f773a5d0038fb`;
       /* Promise.all([getData(currentPath), getData(days5), getData(forecast16)]).then(function(data){
            
             var currentWeather = data[0],
                 forecastFor5Days = data[1],
                 forecastFor16Days = data[2];
             renderCurrentWeather(currentWeather);
             console.log(data);
         }).
         catch(function(err){
            console.log(err);
         });
        */
         getData(currentPath).then(function(data){
             console.log(data);
             renderCurrentWeather(data);
             return getData(days5);
         })
           .then(function(data5Days){
              console.log(data5Days);
              return getData(forecast16);
         })
           .then(function(data16Days){
               console.log(data16Days);
           }) 
           .catch(function(err){
              console.log(err);
           });
     }
      function getData(currentPath){

          return new Promise(function(resolve,reject){
             
             var request = new XMLHttpRequest();
             request.open("GET",currentPath,true);
             request.send(null);
             request.onload = function(){

                  if(request.status >= 200 && request.status < 400 )

                   resolve(JSON.parse(request.responseText));
             
             else 
               reject("error! Something went wrong");
             }
          });
      }

      function renderCurrentWeather(data){

             var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              icon = ("<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>");

                  /* parameters for timezone api call*/

          var timePath = `${data.coord.lat},${data.coord.lon}`,
              prevTime = new Date(),
              timeStamp =  prevTime.getTime()/1000 + prevTime.getTimezoneOffset() * 60,
              apiKey = "AIzaSyAJCwxZ2Fa32qQtnPcv-MTVe5P-67cG2o8",
              hourPath = "https://maps.googleapis.com/maps/api/timezone/json?location="+timePath+"&timestamp="+timeStamp+"&key="+apiKey;
              countryPath = `https://restcountries.eu/rest/v2/alpha/${data.sys.country}`;

               /* local time of the location */

          var currentTime = Promise.all([getData(hourPath),getData(countryPath)]);
              currentTime.then(function(response){
                  //console.log(response);
                var respTime = response[0]; 
                var country = response[1].name; 
                var offsets =  respTime.dstOffset*1000 + respTime.rawOffset*1000;
                var time = new Date(timeStamp * 1000 + offsets);
          

             /* render the data */

                  var dateOutput = ` <div id="weather-details">
               <div id="weather-icon">   
              ${icon} 
               </div>  
               <div id="location">   
              <p>${data.name}</p>
              <p>${country}</p>
              <p>${data.weather[0].main} </p>
              </div>
              <div id="temp">
                   <span>${days[time.getDay()]} </span> <span>${time.getHours()}:${time.getMinutes()} </span>        
                  <p>${parseInt(data.main.temp,10)}&deg;C </p>
              </div>
           </div>   
            <div id="temp-interval">
                 <p> <img src="therm.png"> Max. Temp:${data.main.temp_max}</p>
                 <p> <img src="therm.png"> Min. Temp:${data.main.temp_min} </p>
            </div>
            `;

            $("#currentDate").html(dateOutput);
            $("#details").html(detailsOutput); 
              });

             
         var detailsOutput = ` <p>Humidity: ${data.main.humidity}% </p>
                               <p>Pressure: ${data.main.pressure} mmHg </p>
                               <p>Wind Speed: ${data.wind.speed} Km/h </p>  `;
    
      }



     return{
         init : init
     };

 })();