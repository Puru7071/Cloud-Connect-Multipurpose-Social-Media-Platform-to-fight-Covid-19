const mongoose = require("mongoose") ; 


const postSchema = new mongoose.Schema({
    title : {
        type : String , 
        required: true 
    } , 
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true , 
        ref : "users"
    } , 
    postDescription : {
        type : String , 
        required : true
    } , 
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "comments" 
        }
    ]
} , {
    timestamps : true 
}) ; 

const posts = mongoose.model("posts" , postSchema) ; 

module.exports = posts ; 