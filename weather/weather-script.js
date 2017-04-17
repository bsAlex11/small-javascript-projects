$(document).ready(function(){

  weather.init();

});

 var weather = (function(){

     /*= cache=*/
   
     var search = $("#search"),
     form = $("form"),
     path = "";

     function init(){
         form.on("submit",Submit);
     }
     function Submit(event){
         event.preventDefault();
         var location = search.val();
         currentPath = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=13c5f087963ccabe717f773a5d0038fb`;
        Promise.all([getCurrentWeather(currentPath)]).then(function(data){
             console.log(data);
         }).
         catch(function(err){
            console.log(err);
         });
     }
      function getData(path){

          return new Promise(function(resolve,reject){
             
             var request = new XMLHttpRequest();
             request.open("GET",path,true);
             request.send(null);
             request.onload = function(){

                  if(request.status >= 200 && request.status < 400 )

                   resolve(JSON.parse(request.responseText));
             
             else 
               reject("error! Something went wrong");
             }
          });
      }

     return{
         init : init
     };

 })();