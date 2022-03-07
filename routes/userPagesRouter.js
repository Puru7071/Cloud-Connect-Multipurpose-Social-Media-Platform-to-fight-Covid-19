const express = require("express")
const passport = require("passport") ; 

const router = express.Router() ; 
const userPageController = require("../controllers/userPagesController") ; 

router.post("/sign-up" , userPageController.createNewUser) ; 
router.get("/profile" , passport.checkAuthentication , userPageController.profile) ; 

router.post("/sign-in",passport.authenticate(
    "local" , 
    {failureRedirect : "/users/sign-in"} , 
), userPageController.createSession) ; 

module.exports = router ; 