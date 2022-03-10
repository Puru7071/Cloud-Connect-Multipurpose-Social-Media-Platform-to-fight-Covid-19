const req = require("express/lib/request");
const passport = require("passport") ; 
const LocalStrategy = require("passport-local") ; 

const Users = require("../models/userInfoSchema") ; 

passport.use(new LocalStrategy({
    usernameField : "email" 
} , 

    function(email , password , done){
        Users.findOne({email : email} , function(error , user){
            if(error){
                console.log(`Error in finding the user ${error}`) ; 
                return done(error) ; 
            }

            if(!user || user.password != password){
                console.error(`Error ---> password entered not correct`) ; 
                return done(null , false) ; 
            }

            return done(null , user ) ; 
        })
    }

)) ; 

passport.serializeUser(function(user , done){
    return done(null , user.id) ; 
}); 

passport.deserializeUser(function(id , done){
    Users.findById(id , function(error ,user){
        if(error){
            console.error(`Error occured:${error}`) ; 
            return done(error) ; 
        }
        return done(null , user) ; 
    }) ; 
}) ; 

passport.checkAuthentication = function(request , response , next){
    if(request.isAuthenticated()){
        return next() ;
    }
    return response.redirect('/sign-in') ; 
}
passport.setAuthenticatedUser = function(request, response, next){
    if (request.isAuthenticated()){
        response.locals.user = request.user;
    }
    next();
}