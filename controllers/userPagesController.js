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
            users.create(request.body , function(error , newUser){
                if(error){
                    console.error(`Error in creating new User: ${error}`) ; 
                    return response.redirect("back") ; 
                }
                console.log(`New User Created Succesfully : ${newUser}`) ; 
                var data = {
                    layout : "layout1.ejs" , 
                    title : "Cloud Connect | Sign-in" 
                }
                return response.redirect("sign-in", data) ; 
            }); 
        }
    }) ; 
}