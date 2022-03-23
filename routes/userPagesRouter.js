const express = require("express") ; 

const router = express.Router() ; 

const passport = require('passport');

const userController = require("../controllers/userPagesController") ; 

router.get("/profile/:id" ,passport.checkAuthentication, userController.showProfile) ;

router.get("/home-page" , passport.checkAuthentication , userController.showHomePage) ; 

router.post("/sign-up" , userController.createNewUser) ; 

router.post("/sign-in" ,passport.authenticate(
    "local" ,
    {failureRedirect : '/sign-in'} , 
),userController.createSessionForValidUserMainMethod) ; 

router.get("/sign-out",userController.destroySession) ; 


module.exports = router ; 