const express = require("express") ; 

const router = express.Router() ; 

const passport = require('passport');

const userController = require("../controllers/userPagesController") ; 

router.get("/profile/:id" ,passport.checkAuthentication, userController.showProfile) ;

router.post("/add-bio/:id" ,passport.checkAuthentication, userController.addBio) ; 

router.get("/home-page" , passport.checkAuthentication , userController.showHomePage) ; 

router.get("/live-updates" , passport.checkAuthentication , userController.showLiveUpdates) ; 

router.get("/vac-center" , passport.checkAuthentication , userController.showVaccinationCenter) ; 

router.get("/show-map" , passport.checkAuthentication , userController.showWmap) ; 

router.get("/show-news" , passport.checkAuthentication , userController.showLnews) ; 

router.get("/about-us" , passport.checkAuthentication , userController.showAboutUS) ; 

router.post("/sign-up" , userController.createNewUser) ; 

router.post("/sign-in" ,passport.authenticate(
    "local" ,
    {failureRedirect : '/sign-in'} , 
),userController.createSessionForValidUserMainMethod) ; 

router.get("/sign-out",userController.destroySession) ; 

router.get('/auth/google' , passport.authenticate("google" , {scope: ['profile' , 'email']})) ; 

router.get("/auth/google/callback" ,passport.authenticate(
    "google" ,
    {failureRedirect : '/sign-in'} , 
),userController.createSessionForValidUserMainMethod) ; 

module.exports = router ; 