const posts = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const User = require("../models/userInfoSchema") ; 
const req = require("express/lib/request");
const { response } = require("express");
const { post } = require("../routes/postRouter");
const path = require("path") ; 
const fs = require("fs") ;
const commentsMialer = require("../mailer/commentMailer") ; 



module.exports.createPost =  function(request , response){
    try{
        posts.uploadedPostImages(request , response , async function(error){
            if(error){
                console.error(`Something went wrong: ${error}`) ; 
                request.flash("error" , "Something went wrong") ; 
                return response.redirect("back") ; 
            }
            let post =  await posts.create({
                user : request.user._id,
                title : request.body.title , 
                postDescription : request.body.postDescription, 
                postImages: [] 
            })  ;  
            console.log(request.files) ;
            console.log(post.postImages) ; 
            

            if(request.files){
                
                for(let fle of request.files) {
                    post.postImages.push(posts.imagesPath + "/" + fle.filename) ; 
                }
            }

            console.log("enterd!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11") ; 

            
            post.save() ; 
            request.flash("success" , "Successfully Created Post") ;
            // if(request.xhr){
            //     return response.status(200).json({
            //         data:{
            //             post : post
            //         } , 
            //         message : "Post Created Successfully!"
            //     })
            // }
            return response.redirect("back") ; 
        }) ; 

    }catch(error){
        console.error(` 555555555555555   ${error}`) ; 
        request.flash("error" , `Error in creating post.`) ;
        return response.redirect("back") ;
    }
}

module.exports.deletePost =  async function(request , response){
   try{
        let post = await posts.findById(request.params.id); 
        //This is way to convert the object type into string request.user.id
        console.log(request.user._id , "+++++++++++++" , request.user.id) ; 
        if(request.user.id == post.user){
            for(let pth of post.postImages) {
                fs.unlinkSync(path.join(__dirname , ".." , pth)) ;
            }
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
            comment = await comment.populate("user" , "name email") ; 
            comment = await comment.populate("post" , "title") ; 
            let user = await User.findById(post.user) ; 
            console.log(user.email) ;  

            commentsMialer.newComment(comment ,user.email , user.name) ; 
            console.log("*************************************************\n" + comment) ; 
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