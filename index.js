const express = require("express") ; 
const expressLayouts = require("express-ejs-layouts") ; 
const cookieParser = require("cookie-parser") ; 
const path = require("path") ;
const port = 7777 ; 
const session = require("express-session") ; 
const passport = require("passport") ; 
const passportLocal = require("./config/passport-local-strategy")  ; 



const app = express() ; 
const db = require("./config/mongoose") ; 

app.set("view engine" , "ejs") ; 
app.set("views" , path.join(__dirname , "views")) ; 
app.set("layout extractScripts" , true) ; 
app.set("layout extractStyles" , true) ; 

app.use(expressLayouts)
app.use(cookieParser()) ; 
app.use(express.static("assets")) ; 
app.use(express.urlencoded()) ; 
app.use("/" , require("./routes/homePageRouter")) ; 

app.use(session({
    name: "CloudConnect" , 
    secret: "SomethingFuckingSerious" , 
    saveUninitialized : false , 
    resave : false, 
    cookie: {
        maxAge: (1000* 60 * 100) 
        // this is time in milseconds and 
        // equivalently equal to 100 minutes.
    }
}));  

app.use(passport.initialize()) ; 
app.use(passport.session()) ; 

app.listen(port , function(error){
    if(error){
        console.error(`Server was not able to start due to: ${error}`) ; 
        return ; 
    }
    console.log(`Server is up and running on port no: ${port}`) ; 
    return ; 
}) ;