const { render } = require("express/lib/response");
const passport = require("passport") ; 

module.exports.renderSigninPage = function(request , response){
    if(request.isAuthenticated()){
        return response.redirect("/users/profile") ; 
    }
    console.log("Sign-In Page Rendered") ; 
    var data = {
        layout : "layout1.ejs" , 
        title : "Cloud Connect | Sign-in" 
    }
    return response.render("sign-in" , data ) ; 
}


module.exports.renderSignUpPage = function(request , response){
    if(request.isAuthenticated()){
        return response.redirect("/users/profile") ; 
    }
    console.log("Sign-Up Page Rendered") ; 
    var data = {
        layout : "layout1.ejs" , 
        title : "Cloud Connect | Sign-Up" 
    }
    return response.render("sign-up" , data) ; 
}


module.exports.renderHomePage = function(request , response){
    if(request.isAuthenticated()){
        return response.redirect("/users/profile") ; 
    }
    console.log("Home Page Rendered") ; 
    var data = {
        layout : 'layout1.ejs' , 
        title : "Cloud Connect | Home Page" 
    }
    return response.render("home" , data ) ; 
} ; 