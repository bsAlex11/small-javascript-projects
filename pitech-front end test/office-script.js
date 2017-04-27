$(document).ready(function(){

       //== the slide ==//

  $(".slide:gt(0)").hide();
  var $left = $("#left"),
      $right = $("#right"),
      $container = $("#slider-container");

     $left.on("click",function(){

       $(".slide:visible",$container).fadeOut("slow");
       $(".slide:last-child",$container).prependTo($container).fadeIn("slow");
     });

    $right.on("click",function(){

       $(".slide:visible").fadeOut("slow")
         .next().fadeIn("slow")
          .end()
           .appendTo($container);
    }); 

       //== login box == //

     var $loginBox = $("#login-box"),
         $loginButton = $("#login-button"),
         windowWidth = $(window).outerWidth(),
         overlay = $("#overlay"),
         close = $("#close");

         $loginBox.hide();
      
    $loginButton.on("click",function(){

       if (windowWidth <= 446)
         {
             $loginBox.fadeIn();
             overlay.fadeIn();
             close.fadeIn(); 
         }
        
        else
         $loginBox.fadeToggle("slow");
    });      
      close.on("click",function(){
          $loginBox.fadeOut();
             overlay.fadeOut();
             close.fadeOut(); 
      }); 

        var email = $("#mail"),
            password = $("#password"),
            mailError = $("#mail-error"),
            passError = $("#pass-error");

       email.on("blur",function(){
          var $this = $(this);
          var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if(!(pattern.test($this.val())) || $this.val().length == 0)
                  mailError.fadeIn("slow");
       });  
       email.on("focus",function(){
          mailError.fadeOut("slow");
          passError.fadeOut("slow");
       });   

       password.on("blur",function(){
           var $this = $(this),
               pattern = /^[a-z0-9]+$/i;
                if(!(pattern.test($this.val())) || $this.val().length == 0)
                  passError.fadeIn("slow");
       });
       password.on("focus",function(){
          mailError.fadeOut("slow");
          passError.fadeOut("slow");
       });   


         /*== about us slide content ==*/

       var itemList = $(".sign"),
           hiddenTextList = $(".hidden-text");
         
       itemList.on("click",function(){
            
            var $this = $(this),
                parentDiv = $this.parent(),
                slideDiv = parentDiv.next(".hidden-text"),
                margin = slideDiv.height(),
                number = parentDiv.find(".number"),
                plusSign = parentDiv.find(".plus-sign"),
                minusSign = parentDiv.find(".minus-sign"),
                nextDiv = $("#info-container");
          
         
              if(slideDiv.is(":visible"))   
               {  
                 
                  slideDiv.slideUp(500);
                  parentDiv.animate({"marginBottom" : "-="+margin+"px" },500);
                  nextDiv.animate({"marginTop" : "-="+margin+"px" },500);
                  number.css("backgroundColor","#5cbdce");
                  plusSign.show();
                  minusSign.hide();
               }
              else  
            {  
            slideDiv.slideDown(500);
            parentDiv.animate({"marginBottom" :"+="+ margin+"px" },500);

            nextDiv.animate({"marginTop" :"+="+ margin+"px" },500);
            number.css("backgroundColor","black");
            plusSign.hide();
            minusSign.show();
            }
         
       });  


        /*== links section ==*/

        var moreButton = $("#more");
         moreButton.on("click",function(){
             
              $("#second-row").addClass("animate");
         })

        var showButton = $(".target");
        
        showButton.on("click",function(){
             
             var $this = $(this),
                 subtext = $this.parents(".link-container").children(".subtext"),
                plusLink = $(".plus-link",$this),
                minusLink = $(".minus-link",$this);
              if(subtext.is(":visible"))
                 {
                   subtext.slideUp();
                   plusLink.show();
                   minusLink.hide();
                 }
              else 
              {
                subtext.slideDown();
                plusLink.hide();
                minusLink.show();
              }    
             
        });
});