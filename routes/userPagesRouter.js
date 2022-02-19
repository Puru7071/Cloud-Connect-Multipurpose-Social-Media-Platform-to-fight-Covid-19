const express = require("express")

const router = express.Router() ; 
const userPageRouter = require("../controllers/userPagesController") ; 

router.post("/sign-up" , userPageRouter.createNewUser) ; 