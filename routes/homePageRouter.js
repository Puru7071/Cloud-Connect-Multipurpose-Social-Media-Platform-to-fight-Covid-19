const express = require("express") ; 
const router = express.Router(); 
const homeController = require("../controllers/homePageController") ; 

router.get("/" , homeController.renderHomePage) ; 
router.get("/sign-in" , homeController.renderSigninPage) ;
router.get("/sign-up", homeController.renderSignUpPage ) ;
router.use("/users" , require("./userPagesRouter")) ; 
module.exports = router ; 
