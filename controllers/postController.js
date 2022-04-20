// Below three are the required Documents fo DB for controller functions to executes.
const posts = require("../models/postSchema") ; 
const comments = require("../models/commentSchema") ; 
const User = require("../models/userInfoSchema") ; 

// Below two are the required module for controller function to execute.
const req = require("express/lib/request");
const { response } = require("express");
const { post } = require("../routes/postRouter");
const path = require("path") ; 
const fs = require("fs") ;
const commentsMialer = require("../mailer/commentMailer") ; 


// controller function to create post.
module.exports.createPost =  function(request , response){
    try{
        // function created by the multer in postSchema.
        posts.uploadedPostImages(request , response , async function(error){
            if(error){
                // If some error then give notification via Noty.
                console.error(`Something went wrong: ${error}`) ; 
                request.flash("error" , "Something went wrong") ; 
                return response.redirect("back") ; 
            }
            // now creating post with an emty array of postImages.
            let post =  await posts.create({
                user : request.user._id,
                title : request.body.title , 
                postDescription : request.body.postDescription, 
                postImages: [] 
            })  ;  
            console.log(request.files) ;
            console.log(post.postImages) ; 
            

            if(request.files){
                // If there is post images then we will one by one store there path in the postImages array.
                for(let fle of request.files) {
                    post.postImages.push(posts.imagesPath + "/" + fle.filename) ; 
                }
            }
            // Now making the change permanent not jsut storing them in the RAM.
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
        // now if error give notification via Noty.
        request.flash("error" , `Error in creating post.`) ;
        return response.redirect("back") ;
    }
}
// Delete post controller function.
module.exports.deletePost =  async function(request , response){
   try{
    //    finding post that is being targetted.
        let post = await posts.findById(request.params.id); 
        //This is way to convert the object type into string request.user.id
        console.log(request.user._id , "+++++++++++++" , request.user.id) ; 
       
        // if user making the request and user who made the post is same then we delete the post.
        if(request.user.id == post.user){
            // deleting all the post images by traversing the array.
            for(let pth of post.postImages) {
                fs.unlinkSync(path.join(__dirname , ".." , pth)) ;
            }
        // Then removing the post from the document of post
            post.remove() ; 
        // then atlast removing all the comments made on that particular post by finding them with postId
            comments.deleteMany({post : request.params.id} , function(error){
                console.log(`Sucessfully Deletion of Post Done.`) ; 
                // Giving user message that the successful deletion of the post and related comments is done.
                request.flash("success" , `Successfully Deleted Post and associated Comments`) ; 
                return response.redirect("back") ; 
            }); 
        }
        
        else{
            // if the user that made the post and one who made request to delete the post are not same then
            // we will redirect to sign-in page with a message saying unauthorized accesss.
            console.log(`Unauthorized Access`) ; 
            request.flash("error" , `Unauthorized Access`) ;
            return response.redirect("/sign-in") ; 
        }
   }
   catch(error){
       // if error then making user notified via Noty.
        console.error(`Something went wrong--> ${error}`) ;
        request.flash("error" , `Something went wrong--> ${error}`)  ;
        return response.redirect("back") ; 
   }
}


//Create Comment controller function.
module.exports.createComment = async function(request , response){
    try{
        // now finding the post by the id passed on via request in the params
        let post =  await posts.findById(request.body.postID) ; 
        if(post){
            // now creating the comment.
            let comment = await comments.create({
                content : request.body.comment , 
                post : request.body.postID , 
                user : request.user._id
            }); 
            // now pushing the comment created to post as it required fast loading of the page. 
            post.comments.push(comment)  ; 
            // populating the feilds that are required by mailer.
            comment = await comment.populate("user" , "name email") ; 
            comment = await comment.populate("post" , "title") ; 

            // find the user that made the post.
            let user = await User.findById(post.user) ; 
            console.log(user.email) ;  

            // now suppling the values to nodeamiler newComment function to send the required mail.
            commentsMialer.newComment(comment ,user.email , user.name) ; 
            console.log("*************************************************\n" + comment) ; 
            // then making the changes permanent not storing only in the RAM. 
            post.save() ;

            console.log(`New Comment added successfully!!\n ${comment}`) ; 

            // the giving the notification to user via Noty. 
            request.flash("success" , "Comment added successfully") ; 
            return response.redirect("back") ; 
        }
    }
    catch(error){
        // if any error giving info via Noty. 
        console.error(`Something went wrong--> ${error}`) ; 
        request.flash("error" , "Something went wrong") ; 
        return response.redirect("back") ; 
   }
}

// Delete Comment Controller Function.
module.exports.deleteComment = function(request , response){
    // now finding comment that is being targetted. 
    comments.findById(request.params.id , function(error , comment){
        if(error){
            // incase of error giving notification via Noty. 
            console.error(`Something went wrong: ${error}`) ;
            request.flash("error" , "Something went wrong") ; 
            return response.redirect("back") ; 
        }
        // now checking whether the user that made the request and user that made the comment are the same if yes then:-
        if(comment.user == request.user.id){
            let postId = comment.post ; 
            comment.remove() ; 

            // now deleting the comment from the array of comments associated with post on comment is deleted.
            posts.findByIdAndUpdate(postId , {$pull: {comments : request.params.id} } , function(error ,post){
                if(error){
                    // giving notification of error via Noty.
                    console.error(`Something went wrong: ${error}`) ; 
                    request.flash("error" , "Something went wrong") ; 
                    return response.redirect("back") ; 
                }
                // giving notification of task done via Noty.
                request.flash("success" , `Successfully Deleted Comment`) ; 
                return response.redirect("back") ; 
            }) ;
        }
        else{
             // if the user that made the post and one who made request to delete the post are not same then
            // we will redirect to sign-in page with a message saying unauthorized accesss.
            request.flash("error" , "Unauthorized Access") ; 
            return response.redirect("sign-up") ; 
        }
    }) ;
}