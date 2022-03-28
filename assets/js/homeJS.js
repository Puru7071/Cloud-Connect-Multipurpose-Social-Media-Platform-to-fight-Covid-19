console.log("Script Loaded") ; 

var commentSection = document.getElementsByClassName("view-comment-section"); 

for(let i = 0 ; i < commentSection.length ; i += 1){
    commentSection[i].addEventListener("click",function(event){
        event.stopPropagation() ; 

        if(commentSection[i].getAttribute("data-isVisible") == "false"){
            document.getElementsByClassName("comment-section")[i].style.display = "block" ; 
            document.getElementsByClassName("comment-box")[i].style.borderRadius = "0px" ; 
            document.getElementsByClassName("comment-box")[i].style.borderBottom = "0px" ; 
            commentSection[i].setAttribute("data-isVisible" , "true") ;

        }
        else{
            document.getElementsByClassName("comment-section")[i].style.display = "none" ;
            document.getElementsByClassName("comment-box")[i].style.borderRadius = "0px 0px 20px 20px"
            document.getElementsByClassName("comment-box")[i].style.borderBottom = "5px solid white"; 
            commentSection[i].setAttribute("data-isVisible" , "false") ; 
        }
    }) ;
}

var leftBtn = document.getElementsByClassName("slide-image-left") ; 
var rightBtn = document.getElementsByClassName("slide-image-right") ; 
var imageScreen = document.getElementsByClassName("large-image-box") ; 
var currentPos = 0 ; 

for(let i = 0 ; i < leftBtn.length ; i += 1){
    leftBtn[i].addEventListener("click" , function(event){
        event.stopPropagation() ; 
        if(currentPos < 0 ){
            currentPos += 400 ; 
            console.log("clicked1") ; 
            imageScreen[i].style.left = currentPos.toString() + "px" ; 
        }
    }) ;
    
    rightBtn[i].addEventListener("click" , function(event){
        event.stopPropagation()  ;
        console.log(imageScreen[i].getAttribute("data-imageNumber")) ;
        factor = parseInt(imageScreen[i].getAttribute("data-imageNumber")) - 1 ; 
        console.log(factor) ; 
        if(currentPos > (factor*400)*(-1)){
            currentPos -= 400 ; 
            console.log("clicked2 " + currentPos) ; 
            imageScreen[i].style.left = currentPos.toString() + "px" ; 
        }
        
    }) ; 
}

