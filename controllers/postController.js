const posts = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const req = require("express/lib/request");
const { response } = require("express");
const { post } = require("../routes/postRouter");

module.exports.createPost = function(request , response){
    try{
        posts.create({
            title : request.body.title , 
            postDescription : request.body.postDescription , 
            user : request.user._id 
        } , function(error , post){
            request.flash("success" , `Successfully created post.`) ; 
            return response.redirect("back") ; 
        }) ; 
    }catch(error){
        request.flash("error" , `Error in creating post.`) ;
        return response.redirect("back") ;
    }
}

module.exports.deletePost =  async function(request , response){
   try{
        let post = await posts.findById(request.params.id); 
        //This is way to convert the object type into string request.user.id
        if(request.user.id == post.user){
            post.remove() ; 
    
            comments.deleteMany({post : request.params.id} , function(error){
                console.log(`Sucessfully Deletion of Post Done.`) ; 
                request.flash("success" , `Successfully Deleted Post and associated Comments`) ; 
                return response.redirect("back") ; 
            }); 
        }
        
        else{
            console.log(`Unauthorized Access`) ; 
            request.flash("error" , `Unauthorized Access`) ;
            return response.redirect("/sign-in") ; 
        }
   }
   catch(error){
        console.error(`Something went wrong--> ${error}`) ;
        request.flash("error" , `Something went wrong--> ${error}`)  ;
        return response.redirect("back") ; 
   }
}

module.exports.createComment = async function(request , response){
    try{
        let post =  await posts.findById(request.body.postID) ; 
        if(post){
            let comment = await comments.create({
                content : request.body.comment , 
                post : request.body.postID , 
                user : request.user._id
            }); 
            post.comments.push(comment)  ; 
            post.save() ;
            console.log(`New Comment added successfully!!\n ${comment}`) ; 
            request.flash("success" , "Comment added successfully") ; 
            return response.redirect("back") ; 
        }
    }
    catch(error){
        console.error(`Something went wrong--> ${error}`) ; 
        request.flash("error" , "Something went wrong") ; 
        return response.redirect("back") ; 
   }
}

module.exports.deleteComment = function(request , response){
    comments.findById(request.params.id , function(error , comment){
        if(error){
            console.error(`Something went wrong: ${error}`) ;
            request.flash("error" , "Something went wrong") ; 
            return response.redirect("back") ; 
        }
        if(comment.user == request.user.id){
            let postId = comment.post ; 
            comment.remove() ; 

            posts.findByIdAndUpdate(postId , {$pull: {comments : request.params.id} } , function(error ,post){
                if(error){
                    console.error(`Something went wrong: ${error}`) ; 
                    request.flash("error" , "Something went wrong") ; 
                    return response.redirect("back") ; 
                }
                request.flash("success" , `Successfully Deleted Comment`) ; 
                return response.redirect("back") ; 
            }) ;
        }
        else{
            request.flash("error" , "Unauthorized Access") ; 
            return response.redirect("sign-up") ; 
        }
    }) ;
}