const posts = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const req = require("express/lib/request");
const { response } = require("express");
const { post } = require("../routes/postRouter");

module.exports.createPost = function(request , response){
    posts.create({
        title : request.body.title , 
        postDescription : request.body.postDescription , 
        user : request.user._id 
    } , function(error , post){
        if(error){
            console.error(`Error in creating the post --> ${error}`) ; 
            return response.redirect("back") ; 
        }
        console.log(`New Successfully created--> ${post}`) ; 
        return response.redirect("back") ; 
    }) ; 
}

module.exports.deletePost = function(request , response){
   posts.findById(request.params.id  , function(error , post){
       if(error){
           console.error(`Something went wrong--> ${error}`) ; 
           return response.redirect("back") ; 
       }
       //This is way to convert the object type into string request.user.id
       if(request.user.id == post.user){
           post.remove() ; 

           comments.deleteMany({post : request.params.id} , function(error){
               if(error){
                   console.error(`Something went wrong--> ${error}`) ;
                   return response.redirect("back") ;
               }
               console.log(`Sucessfully Deletion of Post Done.`) ; 
               return response.redirect("back") ; 
           }); 
       }
       else{
           console.log(`Unauthorized Access`) ; 
           return response.redirect("/sign-in") ; 
       }
   }); 
}

module.exports.createComment = function(request , response){
    posts.findById(request.body.postID , function(error , post){
        if(error){
            console.error(`Error in creating comment --> ${error}`) ; 
            return response.redirect("back") ; 
        }
        if(post){
            comments.create({
                content : request.body.comment , 
                post : request.body.postID , 
                user : request.user._id
            } , function(error , comment){
                if(error){
                    console.error(`Error in creating comment--> ${error}`) ; 
                    return response.redirect("back") ; 
                }
                post.comments.push(comment)  ; 
                post.save() ;
                console.log(`New Comment added successfully!!\n ${comment}`) ; 
                return response.redirect("back") ; 
            }) ; 
        }
    }) ; 
}

module.exports.deleteComment = function(request , response){
    comments.findById(request.params.id , function(error , comment){
        if(error){
            console.error(`Something went wrong: ${error}`) ;
            return response.redirect("back") ; 
        }
        if(comment.user == request.user.id){
            let postId = comment.post ; 
            comment.remove() ; 

            posts.findByIdAndUpdate(postId , {$pull: {comments : request.params.id} } , function(error ,post){
                if(error){
                    console.error(`Something went wrong: ${error}`) ; 
                    return response.redirect("back") ; 
                }
                return response.redirect("back") ; 
            }) ;
        }
    }) ;
}