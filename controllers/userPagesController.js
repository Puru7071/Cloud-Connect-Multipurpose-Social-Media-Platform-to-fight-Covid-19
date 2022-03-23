const users = require("../models/userInfoSchema") ; 
const post = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const { populate } = require("../models/userInfoSchema");
const res = require("express/lib/response");

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
            return response.redirect("/sign-in") ; 
        }
        if(!user){
            users.create({
                email : request.body.email , 
                name : request.body.name , 
                password : request.body.password , 
                personlInfo : request.body.Bio
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
    post.find({user : request.params.id})
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
        posts.reverse() ; 
        users.findById(request.params.id , function(error , user){
            if(error){
                console.error(`Something went wrong: ${error}`) ; 
                return response.redirect("back") ; 
            }
            comments.find({user: request.params.id})
            .populate("user")
            .exec(function(error , allComments){
                return response.render("userProfile" , {
                    layout : "userProfile.ejs" ,
                    posts : posts , 
                    isHome : false ,
                    targetUser : user , 
                    allComments : allComments 
                }) ;
            }) ;  
        })
    }) ;
}
  

module.exports.showHomePage = function(request , response){
    post.find({})
    .populate("user")
    .populate({
        path : "comments" ,
        populate : {
            path : "user"
        }
    }).exec(function(error , posts){
        if(error){
            console.error(`Something went wrong! Can not open the home-page: ${error}`) ; 
            return response.redirect("/") ; 
        }
        console.log(posts) ; 
        posts.reverse() ; 
        return response.render("userHomePage.ejs" , {
            layout : "userHomePage.ejs" , 
            posts : posts ,
            isHome : true 
        })
    }); 
}

module.exports.addBio = function(request , response){
    users.findByIdAndUpdate(request.params.id , {personlInfo : request.body.Bio} , function(error , user){
        if(error){
            console.error(`Something went wrong: ${error}`) ; 
            return response.redirect("back") ; 
        }
        console.log(`Bio updated successfully: ${user}`) ; 
        return response.redirect("back");  
    }); 
}

module.exports.createSessionForValidUserMainMethod = function(request , response){
    return response.redirect("/users/home-page") ; 
}
module.exports.destroySession = function(request , resposne){
    request.logout() ; 
    return resposne.redirect("/") ; 
}
