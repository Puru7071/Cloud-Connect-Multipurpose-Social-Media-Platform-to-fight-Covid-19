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

module.exports.profile = function(req, res){
    return res.render('home', {
        title: 'User Profile'
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}