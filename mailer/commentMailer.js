const nodeMialer = require("../config/nodemailer") ; 

module.exports.newComment = function(comment , userEmail , userName){
    const htmlContent = nodeMialer.renderTemplate({comment: comment , email : userEmail , name : userName } , "/commentAddedMail.ejs") ; 
    console.log("Mialer for Comment Added is Active now.") ; 

    nodeMialer.transporter.sendMail({
        from : 'puru.bahrgava011@gmail.com' , 
        to : userEmail , 
        subject : "New Comment Added" , 
        html : htmlContent
    } , function(error , info){
        if(error){
            console.log(`Something went wrong!! ${error}`) ; 
            return ; 
        }
        console.log("Message Sent Successfully: " + info) ; 
        return ; 
    }) ;
}