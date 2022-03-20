const express = require("express") ; 

const router = express.Router() ; 
const passport = require("passport") ; 


const postController = require("../controllers/postController") ; 

router.post("/create-post",passport.checkAuthentication , postController.createPost) ; 

router.get("/delete-post/:id" , postController.deletePost) ; 
router.post("/create-comments" , passport.checkAuthentication , postController.createComment)

module.exports = router ; 