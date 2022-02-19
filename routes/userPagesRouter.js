const express = require("express")

const router = express.Router() ; 
const userController = require("../controllers/userPagesController") ; 

router.post("/sign-up" , userController.createNewUser) ; 