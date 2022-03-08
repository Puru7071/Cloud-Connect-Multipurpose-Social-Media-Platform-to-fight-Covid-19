const express = require("express") ; 

const router = express.Router() ; 

const passport = require('passport');

const userController = require("../controllers/userPagesController") ; 

router.get("/profile" ,passport.checkAuthentication, userController.showProfile) ; 
router.post("/sign-up" , userController.createNewUser) ; 
router.post("/sign-in" ,passport.authenticate(
    "local" ,
    {failureRedirect : '/sign-in'} , 
),userController.createSessionForValidUserMainMethod) ; 

module.exports = router ; 