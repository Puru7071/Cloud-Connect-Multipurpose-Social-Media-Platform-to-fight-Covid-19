const express = require("express") ; 
const expressLayouts = require("express-ejs-layouts") ; 
const cookieParser = require("cookie-parser") ; 
const path = require("path") ;
const port = 7777 ; 
const session = require("express-session") ; 
const passport = require("passport") ; 
const passportLocal = require("./config/passport-local-stategy")  ; 
const sassMiddleware = require("node-sass-middleware") ; 
const flash = require("connect-flash") ; 
const myMware = require("./config/middleware") ; 
 

const app = express() ; 
const db = require("./config/mongoose") ; 
const Mongostore = require("connect-mongo");
const exp = require("constants");

app.use(sassMiddleware({
    src: "./assets/scss" , 
    dest: "./assets/css" , 
    debug : true , 
    outputStyle : "extended" , 
    prefix : "/css"
})) ;

app.set("view engine" , "ejs") ; 
app.set("views" , path.join(__dirname , "views")) ; 
app.set("layout extractScripts" , true) ; 
app.set("layout extractStyles" , true) ; 

app.use(expressLayouts)
app.use(cookieParser()) ; 
app.use(express.static(path.join(__dirname , "assets"))) ; 
app.use(express.urlencoded()) ; 

app.use(session({
    name : "CloudConnect" , 
    resave : false , 
    secret : "This is fucking serious." , 
    saveUninitialized : false , 
    cookie : {
        maxAge : (1000 * 120 * 60 ) 
    },
    store: Mongostore.create({
                 mongoUrl: 'mongodb://localhost/SocialMediaDatabase',
                 autoRemove:'disabled'
        })
})) ; 
app.use(passport.initialize()) ; 
app.use(passport.session()) ; 

app.use(passport.setAuthenticatedUser) ; 

app.use(flash()) ; 
app.use(myMware.setFlash) ; 

app.use("/uploads" , express.static(__dirname + "/uploads"))
app.use("/" , require("./routes/homePageRouter")) ; 

app.listen(port , function(error){
    if(error){
        console.error(`Server was not able to start due to: ${error}`) ; 
        return ; 
    }
    console.log(`Server is up and running on port no: ${port}`) ; 
    return ; 
}) ;

