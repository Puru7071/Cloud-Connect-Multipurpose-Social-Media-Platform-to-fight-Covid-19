const mongoose = require("mongoose") ; 

const userSchema = mongoose.Schema({
    email : {
        type : String , 
        required: true , 
        unique : true
    } , 
    password : {
        type: String , 
        required : true 
    } , 
    name : {
        type: String , 
        required : true 
    } , 
    personlInfo :{
        type: String 
    }
} , {
    timestamps : true 
}) ; 

const users = mongoose.model("users" , userSchema) ; 

module.exports = users ; 