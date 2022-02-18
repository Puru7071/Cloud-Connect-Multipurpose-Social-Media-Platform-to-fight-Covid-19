const { render } = require("express/lib/response");

module.exports.renderSigninPage = function(request , response){
    var data = {
        layout : "layout1.ejs" , 
        title : "Cloud Connect | Sign-in" , 
        src : "./images/sigin.png"
    }
    return response.render("sign-in" , data ) ; 
}


module.exports.renderSignUpPage = function(request , response){
    var data = {
        layout : "layout1.ejs" , 
        title : "Cloud Connect | Sign-Up" , 
        src : "./images/sigin.png"
    }
    return response.render("sign-up" , data) ; 
}


module.exports.renderHomePage = function(request , response){
    var data = {
        layout : 'layout1.ejs' , 
        title : "Cloud Connect | Home Page" , 
        src : "./images/sigin.png"
    }
    return response.render("home" , data ) ; 
} ; 