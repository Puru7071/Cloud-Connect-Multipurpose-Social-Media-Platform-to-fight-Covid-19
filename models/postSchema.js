const mongoose = require("mongoose") ; 
// we will require multer module to store the upload
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
    // for storing the path of post images and we need to store more than one path so we will require
    // array of type string. 
    postImages : [
        {
            type : String 
        }
    ] , 
    likes : [
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref: "users"
        }
    ] , 
    dislikes : [
        {
            type: mongoose.Schema.Types.ObjectId , 
            ref: "users"
        }
    ]
} , {
    timestamps : true 
}) ; 


// Now telling the multer about the where is the storage and what is the name of the file storage. 
let storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , POST_PATH)) ; 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
}) ;

//setting a function named uploadedPostImages in the statics property of the postSchema that is taken care 
// by the multer we just need to tell that tell it the storage and it takes array of inputs.
postSchema.statics.uploadedPostImages = multer({storage : storage2}).array("postImages",10);

// setting the path of storage in the statics property of the userSchema for future use.
postSchema.statics.imagesPath = POST_PATH ; 

// creating posts document using the postSchema.
const posts = mongoose.model("posts" , postSchema) ; 

module.exports = posts ; 