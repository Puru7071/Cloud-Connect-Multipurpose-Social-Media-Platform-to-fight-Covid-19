const passport = require("passport") ; 
const googlOAuth = require("passport-google-oauth").OAuth2Strategy ; 
const crypto = require("crypto")  ; 
const User = require("../models/userInfoSchema") ; 

passport.use(new googlOAuth({
    clientID :  "863742172650-oq620v30cuptg9677mifs534f7dgpoic.apps.googleusercontent.com" , 
    clientSecret : "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" , 
    callbackURL : "http://localhost:7777/users/auth/google/callback" 
} , 
    function(accessToken , refreshToken , profile , done){
        User.findOne({email : profile.emails[0].value}).exec(function(error , user){
            if(error){
                console.error(`Error in google stategy passport: ${error}`) ; 
                return ; 
            }
            console.log("*********************"+profile.emails[0]+"*********************") ; 

            if(user){
                return done(null , user) ; 
            }else{
                User.create({
                    name : profile.displayName , 
                    email : profile.emails[0].value , 
                    passport: crypto.randomBytes(20).toString("hex") 
                } , function(erro , user){
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