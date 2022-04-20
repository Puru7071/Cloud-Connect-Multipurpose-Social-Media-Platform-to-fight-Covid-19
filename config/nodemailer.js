const nodemailer = require("nodemailer") ; 
const ejs = require("ejs")  ; 
const path = require("path") ; 

// defining the transporter properties that will be used to send the mail to users. 
let transporter = nodemailer.createTransport({
    service : 'gmail' , 
    host : 'smtp.gmail.com' , 
    port : 587 , 
    secure : false , 
    auth : {
        user: 'puru.bhargava011@gmail.com' , 
        pass : 'fsenrnvmxdbgiorh'
    } 
}) ; 

// this will return the template after filling the data required by ejs. 
let renderTemplate = (data , relativePath) =>{
    let mailHTML ; 
    // main function responsible for returning the template.
    ejs.renderFile(
        // sending the file path 
        path.join(__dirname , '../views/mailers' , relativePath) , // data supplied needed 
        // by template is supplied by this
        data , function(error , template){ // this the callback function.
            if(error){
                console.log(`Error in rendering template: ${error}`) ; 
                return ; 
            }
            mailHTML = template ; 
        }
    )
    return mailHTML; // returning ready template back where this function was called.
} ;

module.exports = {
    transporter : transporter , 
    renderTemplate : renderTemplate 
}