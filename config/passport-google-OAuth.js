const passport = require("passport") ; 
// telling which googleOAuth statergy we are going to follow.
const googlOAuth = require("passport-google-oauth").OAuth2Strategy ;
// this module for generating random password if the user is not existant.  
const crypto = require("crypto")  ; 
// we will require the user document. 
const User = require("../models/userInfoSchema") ; 

passport.use(new googlOAuth({
    // here is the credentials requried for the google authentication to work.
    clientID :  "863742172650-oq620v30cuptg9677mifs534f7dgpoic.apps.googleusercontent.com" , 
    clientSecret : "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" , 
    // which requested URL to hit when the user is authenticated.
    callbackURL : "http://localhost:7777/users/auth/google/callback" ,
    passReqToCallback: true
} , 
    function(request,accessToken , refreshToken , profile , done){
        // creating new user or loggin the existing user.
        User.findOne({email : profile.emails[0].value}).exec(function(error , user){
            if(error){
                console.error(`Error in google stategy passport: ${error}`) ; 
                return ; 
            }
            console.log("*********************"+profile.emails+"*********************") ; 

            if(user){
                return done(null , user) ; 
            }else{
                User.create({
                    name : profile.displayName , 
                    email : profile.emails[0].value , 
                    // generating random 20 Bytes and then converting it to String where for number we are using
                    // hexdecimal number system.
                    password: crypto.randomBytes(20).toString("hex") 
                } , function(error , user){
                    if(error){
                        console.error("Error in creating a new user: " + error) ; 
                        return ; 
                    }
                    console.log(`New user created: \n` + user) ;
                    return done(null , user) ; 
                })
            }
        }) ; 
    }
))