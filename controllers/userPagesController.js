const users = require("../models/userInfoSchema") ; 
const post = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const { populate } = require("../models/userInfoSchema");
const res = require("express/lib/response");
const path = require("path") ; 
const fs = require("fs") ; 

module.exports.createNewUser = function(request , response){
    if(request.body.password != request.body.CPassword){
        console.error("Password entered not same.") ; 
        request.flash("error" , "Password entered not same.")
        return response.redirect("back") ; 
    }
    users.findOne({email : request.body.email} , function(error , user){
        if(error){
            console.log(`Something went wrong: ${error}`) ;
            request.flash("error" , "Something went wrong.")  ; 
            return response.redirect("back") ; 
        }
        if(user){
            console.error("Email Already in use!") ; 
            request.flash("error" , "Email already in use.") ; 
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
                    request.flash("error" , "Error in creating user") ; 
                    return response.redirect("back") ; 
                }
                console.log(`New User Created Succesfully : ${newUser}`) ; 
                request.flash("success" , "Account Created Successfully") ; 
                return response.redirect("/sign-in") ; 
            }); 
        }
    }) ; 
}  

module.exports.showProfile = async function(request , response){
    try{
        let posts = await post.find({user : request.params.id})
        .populate("user")
        .populate({
            path: "comments" , 
            populate: {
                path: "user"
            }
        });
        
        console.log("showing posts") ; 
        posts.reverse() ; 
        let user = await users.findById(request.params.id) ; 

        let allComments = await comments.find({user: request.params.id}).
        populate("user");  
        console.log(user) ; 
        allComments.reverse() ; 
        return response.render("userProfile" , {
            layout : "userProfile.ejs" ,
            posts : posts , 
            isHome : false ,
            targetUser : user , 
            allComments : allComments 
        }) ;
    }
    catch(error){
        console.error(`Sonething went wrong --> ${error}`) ; 
        request.flash("error" , "Something went wrong") ; 
        response.redirect("back") ; 
    }
}
  

module.exports.showHomePage = async function(request , response){
    try{
        let posts = await post.find({})
        .populate("user")
        .populate({
            path : "comments" ,
            populate : {
                path : "user"
            }
        }) ; 
        console.log(posts) ; 
        posts.reverse() ; 
        return response.render("userHomePage.ejs" , {
            layout : "userHomePage.ejs" , 
            posts : posts ,
            isHome : true 
        }) ;
    }catch(error){
        console.error(`Sonething went wrong--> ${error}`) ; 
        request.flash("error" , "Something went wrong") ;
        return response.redirect("back") ; 
    }
}

module.exports.addBio = async function(request , response){
    try{
        let user = await users.findById(request.params.id)  ; 
        users.uploadedAvatar(request , response , function(error){
            if(error){
                console.log("Something went wrong: ", error) ; 
                request.flash("error" , "Something went wrong") ; 
            }
            if(request.body.Bio){
                user.personlInfo = request.body.Bio ; 
                request.flash("success" , "Bio Updated Successfully") ; 
            }
            if(request.file){
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname , ".." , user.avatar)) ; 
                }
                user.avatar = users.avatarPath + "/" + request.file.filename; 
                console.log(request.file) ; 
                
                request.flash("success" , "Bio Updated Successfully") ; 
            }
            user.save() ; 
            return response.redirect("back") ; 
        }) ; 
    }catch(error){
        console.error(`Something went wrong--> ${error}`) ; 
        request.flash("error","Something went wrong") ;  
        return response.redirect("back") ; 
    }
}

module.exports.createSessionForValidUserMainMethod = function(request , response){
    request.flash("success" , "Logged in Successfully!!!") ; 
    return response.redirect("/users/home-page") ; 
}
module.exports.destroySession = function(request , resposne){
    request.logout() ; 
    request.flash("success" , "Logged out Successfully!!!") ; 
    return resposne.redirect("/") ; 
}
