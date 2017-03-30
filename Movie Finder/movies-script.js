$(document).ready(function(){

  movie.init();

});

var movie = (function(){
   
   /*== cache ==*/
     
      var $input = $("#searchText"),
          $form = $("form"),
          $movieContainer = $("#movies-container");

 /*== add events ==*/

      function init(){
          $form.on("submit",function(event){
              event.preventDefault();
              var searchTag = $input.val();
         
          if(searchTag.length <1 )
               displayFade();
             else { 
              getData("http://www.omdbapi.com/?s=",searchTag).then(function(data){
                   render(data);
              }).catch(function(err){
                   var error = `
                              <img id="error" src="error.png">
                              <p>No results found! </p>
                   `;
                 $movieContainer.html(error);  
              });
             }  
          });
          $movieContainer.on("click","a",movieInfo);
          $("#close").on("click",clearModal);
      }     

    /*== get the movies via ajax ==*/

      function getData(url,searchTag){
          
          return new Promise(function(resolve,reject){
    
              var request = new XMLHttpRequest();
              request.open("GET",url + searchTag, true);
              request.send(null);
              request.onload = function(){
                    
                     if(request.status >=200 && request.status < 400)    
                         {
                              var data = JSON.parse(request.responseText);
                              resolve(data); 
                         }
                      else 
                        reject("error");   
              }     
          });      
      }

         /*== show the movies ==*/

     function render(movieList){
         var list = movieList.Search;
         var html = list.map(function(elm){
    
               return `
                       <div class="movies">

                          <img src="${elm.Poster}">
                          <h3>${elm.Title}</h3>
                          <a  href="" data-movieID="${elm.imdbID}">Movie Details</a>

                       </div>
               `;
         });
         $movieContainer.html(html);
     } 

       /*== display the error message ==*/

     function displayFade(){

         var $messageBox  = $("p",$form);
         $messageBox.fadeIn(500);

         setTimeout(function() {
             $messageBox.fadeOut(500);
         }, 1500); 
     }

      /*== show the modal ==*/

     function movieInfo(event){
          event.preventDefault();
          var movieID = $(this).data("movieid");
  
          getData("http://www.omdbapi.com/?i=",movieID).then(function(data){
              putInModal(data);
              $("#modal").fadeIn("fast");  
              $("#overlay").css("height",height+"px").show();         
          });
          
          var height = $("#movies-container").outerHeight() + $("#form-container").outerHeight()+150;
    
          
     }

         /*== add data to the modal ==*/

         function putInModal(info){
              var out = `
                <div id="info-container">
   
                    <div id="pic-container">
                       <img src="${info.Poster}" id="poster">
                    </div> 
                    <div id="details">
                       <h1>${info.Title} </h1>
                       <div id="additional">
                           <p>Genre: ${info.Genre} </p>
                           <p>Released: ${info.Released} </p>
                           <p>Rated: ${info.Rated} </p>
                           <p>IMDB Rating: ${info.imdbRating} </p>
                           <p>Director: ${info.Director} </p>
                           <p>Writer: ${info.Writer} </p>
                           <p>Actors: ${info.Actors} </p>
                       </div>
                    </div>
                  </div>  
                    <h2>Plot: </h2>
                    <p>${info.Plot} </p>
                    <a href="http://imdb.com/title/${info.imdbID}" target="_blank">View on IMDB</a>
            
              `;
              $("#modal").append(out);
         }

           /*== clear the modal ==*/
            
            function clearModal(){

                var $modal = $("#modal"),
                    elms = $modal.children().not("#close");
                  elms.remove();
                  $modal.hide();
                  $("#overlay").hide();
            }

     return{
         init : init
     }; 

})();