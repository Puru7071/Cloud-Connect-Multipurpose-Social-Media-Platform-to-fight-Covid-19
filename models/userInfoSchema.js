const mongoose = require("mongoose") ; 
<<<<<<< HEAD
=======
const multer = require("multer") ; 
const path = require("path") ; 
const AVATAR_PATH = path.join('uploads/users/avatars') ; 

>>>>>>> back

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
<<<<<<< HEAD
=======
    } , 
    personlInfo :{
        type: String 
    } , 
    avatar: {
        type : String 
>>>>>>> back
    }
} , {
    timestamps : true 
}) ; 

<<<<<<< HEAD
const users = mongoose.model("users" , userSchema) ; 

=======
let storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname , ".." , AVATAR_PATH)) ; 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
}) ;


userSchema.statics.uploadedAvatar = multer({storage : storage1}).single("avatar") ; 
userSchema.statics.avatarPath = AVATAR_PATH ; 

const users = mongoose.model("users" , userSchema) ; 


>>>>>>> back
module.exports = users ; 