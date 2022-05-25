// we need same instance of the data base established before.
const mongoose = require("mongoose") ; 
// some libraries for multiple images upload.
const multer = require("multer") ; 
const path = require("path") ; 
// defining a path where avatar will be stored.
const AVATAR_PATH = path.join('uploads/users/avatars') ; 


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
    } , 
    avatar: {
        type : String 
    } , 
    postBlocked: {
        type: Number 
    }
} , {
    timestamps : true 
}) ; 

// defining storage and where the files will be stored.
let storage1 = multer.diskStorage({
    // telling the destination of the files.
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , AVATAR_PATH)) ; 
    },
    // telling the filename with which file is stored in the destiantion storage location.
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
}) ;

//setting a function named uploadedAvatar in the statics property of the userSchema that is taken care 
// by the multer we just need to tell that tell it the storage and it takes only one file as input.
userSchema.statics.uploadedAvatar = multer({storage : storage1}).single("avatar") ; 

// setting the path of storage in the statics property of the userSchema for future use.
userSchema.statics.avatarPath = AVATAR_PATH ; 

// creating user document using the userSchema.
const users = mongoose.model("users" , userSchema) ; 

// exporting the user document created by the above step.
module.exports = users ; 