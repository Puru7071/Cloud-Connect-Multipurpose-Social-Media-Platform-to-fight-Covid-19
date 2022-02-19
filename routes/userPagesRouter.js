const express = require("express")

const router = express.Router() ; 
const userController = require("../controllers/userPagesController") ; 

router.get("/profile" , userController.showProfile) ; 
router.post("/sign-up" , userController.createNewUser) ; 
router.post("/sign-in" , userController.createSessionForValidUser) ; 

module.exports = router ; 