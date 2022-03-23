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

