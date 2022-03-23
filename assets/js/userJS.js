"use strict"
console.log("Script Loaded") ; 
var isPostButtonClicked = false ; 
var isBioButtonClicked = false ; 

if(document.getElementsByClassName("create-post-form")[0].getAttribute("data-isAllJsNeeded") == "true"){
    document.getElementsByClassName("create-post-button")[0].addEventListener("click", function(event){
        event.stopPropagation() ; 
        if(isBioButtonClicked){
            document.getElementsByClassName("add-about-yourself-form")[0].style.display = "none" ;
            document.getElementsByClassName("profile-constainer")[0].style.height = "400px" ;
            document.getElementsByClassName("move-up-whole")[0].style.top = "-60px" ; 
            document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "220px"
            isBioButtonClicked = false ; 
        }
        if(!isPostButtonClicked){
            document.getElementsByClassName("create-post-form")[0].style.display = "block" ;
            document.getElementsByClassName("create-post-form")[0].style.position = "relative" ; 
            document.getElementsByClassName("create-post-form")[0].style.top = "-300px"
            document.getElementsByClassName("profile-constainer")[0].style.height = "800px"
            document.getElementsByClassName("fas fa-sort-down fa-2x")[0].setAttribute("class","fas fa-sort-up fa-2x") ; 
            document.getElementsByClassName("fas fa-sort-up fa-2x")[0].style.position = "relative" ; 
            document.getElementsByClassName("fas fa-sort-up fa-2x")[0].style.top = "6px" ; 
            document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "-220px"
            document.getElementsByClassName("move-up-whole")[0].style.top = "-200px" ; 
            isPostButtonClicked = true ; 
        }else{
            document.getElementsByClassName("create-post-form")[0].style.display = "none" ;
            document.getElementsByClassName("profile-constainer")[0].style.height = "400px" ; 
            document.getElementsByClassName("fas fa-sort-up fa-2x")[0].setAttribute("class","fas fa-sort-down fa-2x ") ; 
            document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.position = "relative" ; 
            document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.top = "-4px" ; 
            document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "120px"
            document.getElementsByClassName("move-up-whole")[0].style.top = "120px" ; 
            isPostButtonClicked =  false ; 
        }
    }) ; 
    
    
    document.getElementsByClassName("add-about-yourself")[0].addEventListener("click" , function(event){
        event.stopPropagation() ; 
        if(isPostButtonClicked){
            document.getElementsByClassName("create-post-form")[0].style.display = "none" ;
            document.getElementsByClassName("profile-constainer")[0].style.height = "400px" ; 
            document.getElementsByClassName("fas fa-sort-up fa-2x")[0].setAttribute("class","fas fa-sort-down fa-2x ") ; 
            document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.position = "relative" ; 
            document.getElementsByClassName("fas fa-sort-down fa-2x")[0].style.top = "-4px" ; 
            document.getElementsByClassName("move-up-whole")[0].style.top = "-300px" ; 
            isPostButtonClicked =  false ; 
        }
        if(!isBioButtonClicked){
            document.getElementsByClassName("add-about-yourself-form")[0].style.display = "block" ;
            document.getElementsByClassName("add-about-yourself-form")[0].style.position = "relative" ; 
            document.getElementsByClassName("add-about-yourself-form")[0].style.top = "-200px"
            document.getElementsByClassName("profile-constainer")[0].style.height = "700px"
            document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "-120px"
            document.getElementsByClassName("move-up-whole")[0].style.top = "-100px" ; 
            isBioButtonClicked = true ; 
        }
        else{
            document.getElementsByClassName("add-about-yourself-form")[0].style.display = "none" ;
            document.getElementsByClassName("profile-constainer")[0].style.height = "400px" ;
            document.getElementsByClassName("move-up-whole")[0].style.top = "120px" ; 
            document.getElementsByClassName("show-post-comment-buttons")[0].style.top = "120px"
            isBioButtonClicked = false ; 
        }
    });
}

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

 

document.getElementsByClassName("show-comment-button")[0].addEventListener("click" , function(event){
    event.stopPropagation() ; 
    document.getElementsByClassName("move-up-whole")[0].style.display = "none" ; 
    document.getElementsByClassName("comment-main-card")[0].style.display = "block"
    document.getElementsByClassName("comment-main-card")[0].style.top = "120px"
}); 

document.getElementsByClassName("show-post-button")[0].addEventListener("click" , function(event){
    event.stopPropagation() ; 
    document.getElementsByClassName("comment-main-card")[0].style.display = "none" ; 
    document.getElementsByClassName("move-up-whole")[0].style.display = "block" ; 
}) ; 