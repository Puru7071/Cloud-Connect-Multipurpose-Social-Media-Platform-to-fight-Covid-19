const { render } = require("express/lib/response");

module.exports.renderSigninPage = function(request , response){
    console.log("Sign-In Page Rendered") ; 
    var data = {
        layout : "layout1.ejs" , 
        title : "Cloud Connect | Sign-in" 
    }
    return response.render("sign-in" , data ) ; 
}


module.exports.renderSignUpPage = function(request , response){
    console.log("Sign-Up Page Rendered") ; 
    var data = {
        layout : "layout1.ejs" , 
        title : "Cloud Connect | Sign-Up" 
    }
    return response.render("sign-up" , data) ; 
}


module.exports.renderHomePage = function(request , response){
    console.log("Home Page Rendered") ; 
    var data = {
        layout : 'layout1.ejs' , 
        title : "Cloud Connect | Home Page" 
    }
    return response.render("home" , data ) ; 
} ; 