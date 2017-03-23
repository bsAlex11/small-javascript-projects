
document.addEventListener("keydown",hit);

var tabList = document.getElementsByClassName("key");
var soundList = document.getElementsByTagName("audio");     // add the key event to document, and set up the lists with the elements

for(var i = 0; i < tabList.length; i++)
    tabList[i].addEventListener("transitionend", remove);   // remove the effect from the specific element

    function hit(event){

       for(var i = 0; i < tabList.length; i++)
         {
             var tabCode = tabList[i].getAttribute("data-key");
             tabCode = Number(tabCode);
    
           if(tabCode == event.keyCode) 
            { 
              tabList[i].classList.add("playing");
            }   
         // save the keycode and check into the divs list to see if data-key is equal to the keycode
          // if equal, set the effect on that element   
}

      for(var j = 0; j < soundList.length; j++ )
        {
            var soundCode = soundList[j].getAttribute("data-sound");
            soundCode = Number(soundCode);

            if(soundCode == event.keyCode)
               { 
                   soundList[j].currentTime = 0;
                   soundList[j].play();   
               }    
        }
    }   
       // find the sound that matches the keyCode of the keydown event
        // reset the playtime (currentTime = 0), and play again

    function remove(event){
        this.classList.remove("playing");
    }