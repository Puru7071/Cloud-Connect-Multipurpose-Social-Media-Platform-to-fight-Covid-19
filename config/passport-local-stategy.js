const req = require("express/lib/request");
const passport = require("passport") ; 
const LocalStrategy = require("passport-local") ; 

const Users = require("../models/userInfoSchema") ; 

passport.use(new LocalStrategy({
    usernameField : "email" , 
    passReqToCallback: true
} , 

    function(req, email , password , done){
        Users.findOne({email : email} , function(error , user){
            if(error){
                req.flash("error","Something went wrong.") ; 
                return done(error) ; 
            }

            if(!user || user.password != password){
                req.flash("error","No such user found.") ; 
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
            return done(error) ; 
        }
        return done(null , user) ; 
    }) ; 
}) ; 

passport.checkAuthentication = function(request , response , next){
    if(request.isAuthenticated()){
        console.log("Users is Authenticated") ; 
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