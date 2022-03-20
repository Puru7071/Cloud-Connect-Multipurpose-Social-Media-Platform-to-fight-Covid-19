const users = require("../models/userInfoSchema") ; 
const post = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 

module.exports.createNewUser = function(request , response){
    if(request.body.password != request.body.CPassword){
        console.error("Password entered not same.") ; 
        return response.redirect("back") ; 
    }
    users.findOne({email : request.body.email} , function(error , user){
        if(error){
            console.log(`Something went wrong: ${error}`) ; 
            return response.redirect("back") ; 
        }
        if(user){
            console.error("Email Already in use!") ; 
            return response.redirect("back") ; 
        }
        if(!user){
            users.create({
                email : request.body.email , 
                name : request.body.name , 
                password : request.body.password
            } , function(error , newUser){
                if(error){
                    console.error(`Error in creating new User: ${error}`) ; 
                    return response.redirect("back") ; 
                }
                console.log(`New User Created Succesfully : ${newUser}`) ; 
                return response.redirect("/sign-in") ; 
            }); 
        }
    }) ; 
}  

module.exports.showProfile = function(request , response){
    post.find({user : request.user._id})
    .populate("user")
    .populate({
        path: "comments" , 
        populate: {
            path: "user"
        }
    }).exec(function(error , posts){
        if(error){
            console.error(`Error in showing the post--> ${error}`) ; 
            return response.redirect("back") ; 
        }
        console.log(posts) ; 
        return response.render("userProfile" , {
            layout : "userProfile.ejs" ,
            posts : posts
        }) ; 
    }) ;
}
       

module.exports.createSessionForValidUserMainMethod = function(request , response){
    return response.redirect("/users/profile") ; 
}
module.exports.destroySession = function(request , resposne){
    request.logout() ; 
    return resposne.redirect("/") ; 
}
