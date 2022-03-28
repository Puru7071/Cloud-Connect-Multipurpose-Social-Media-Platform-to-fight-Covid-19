const mongoose = require("mongoose") ; 
const multer = require("multer") ; 
const path = require("path") ; 
const POST_PATH = path.join('uploads/users/posts') ; 

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
        
    } , 
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "comments" 
        }
    ] , 
    postImages : [
        {
            type : String 
        }
    ]
} , {
    timestamps : true 
}) ; 

let storage2= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , POST_PATH)) ; 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
}) ;

postSchema.statics.uploadedPostImages = multer({storage : storage2}).array("postImages",10); 
postSchema.statics.imagesPath = POST_PATH ; 


const posts = mongoose.model("posts" , postSchema) ; 

module.exports = posts ; 