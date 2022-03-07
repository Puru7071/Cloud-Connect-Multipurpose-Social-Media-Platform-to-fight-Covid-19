const passport = require("passport") ; 
const LocalStrategy = require("passport-local").Strategy ; 
const Users = require("../models/userInfoSchema") ; 


// to authenticate the user coming the website.

passport.use(new LocalStrategy({
    usernameField : "email"
}, 
    function(email , name , done){
        Users.findOne({email : email} , function(error , user){
            if(error){
                console.log("Error in finding user ---> Passport") ; 
                return done(error) ; 
            }
            if(!user || user.passport != passport){
                console.log("Invalid Username/Password") ; 
                return done(null , false); 
            }
            return done(null , user) ; 
        }) ; 
    }
)) ; 

// serializing the user's info to store the required info in cookie-session.

passport.serializeUser(function(user , done){
    done(null , user.id) ; 
}) ; 

// deserialinzing the user's info from the session cookie so that browser can interpret the required action
passport.deserializeUser(function(id , done){
    Users.findById(id , function(error , user){
        if(error){
            console.error("Error in finding user ---> passport") ; 
            return done(null , user) ; 
        }
        return done(null , user) ;
    })
}) ; 

passport.checkAuthentication = function(req , res , next){
    // if the user is signed then pass on to next fucntion middleware.
    if(req.isAuthenticated()){
        return next() ; 
    }

    // if the user is not signed in 
    return res.redirect("/sign-in") ; 
}

passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        res.user = req.user ; 
    }
    next() ; 
}



module.exports = passport ; 