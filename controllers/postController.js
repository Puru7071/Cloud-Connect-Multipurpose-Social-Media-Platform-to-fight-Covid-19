const posts = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 

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
    posts.findByIdAndDelete(request.params.id , function(error){
        if(error){
            console.erro(`Error in deleting the post--> ${error}`) ; 
            return response.redirect("back") ; 
        }
        console.log("Task Deleted Successfully") ; 
        return response.redirect("back") ; 
    }) ;
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