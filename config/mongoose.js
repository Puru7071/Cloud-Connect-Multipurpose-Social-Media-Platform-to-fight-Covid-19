const mongoose = require("mongoose") ; 

mongoose.connect("mongodb://localhost/SocialMediaDatabase") ; 

const db = mongoose.connection ; 

db.on("error" , function(error){
    console.error(`Failed To Connect to the DataBase due to: ${error}`) ; 
    return ; 
}) ; 

db.once("open" , function(){
    console.log("Succesfully Connected to the Database") ; 
}) ; 

module.exports = db ; 