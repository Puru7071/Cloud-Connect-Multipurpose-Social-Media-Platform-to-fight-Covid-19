const users = require("../models/userInfoSchema") ; 

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



// module.exports.createSessionForValidUser = function(request , response){
//     users.findOne({email : request.body.email} , function(error , user){
//         if(error){
//             console.error(`Something went wrong: ${error}`) ; 
//             return response.redirect("back") ; 
//         }
//         if(user){
//             if(request.body.password == user.password){
//                 response.cookie("user_id" , user.id) ; 
//                 return response.redirect("/users/profile") ; 
//             }
//             console.error("Password or Email entered is incorrect.") ; 
//             return response.redirect("back") ; 
//         }
//         else{
//             console.error(`No Such user found Please Create Account`) ; 
//             return response.redirect("/sign-up") ; 
//         }
//     }) ; 
// }

module.exports.showProfile = function(request , response){
    var data = {
                layout : "userProfile.ejs" , 
                title : "User's Profile | Cloud Connect" 
            }
    return response.render("userProfile" , data) ; 
}

module.exports.createSessionForValidUserMainMethod = function(request , response){
    return response.redirect("/users/profile") ; 
}

