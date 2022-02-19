const express = require("express") ; 
const expressLayouts = require("express-ejs-layouts") ; 
const cookieparser = require("cookie-parser") ;
const path = require("path") ;
const port = 7777 ; 

const db = require("./config/mongoose") ; 

const app = express() ; 


app.set("view engine" , "ejs") ; 
app.set("views" , path.join(__dirname , "views")) ; 
app.set("layout extractScripts" , true) ; 
app.set("layout extractStyles" , true) ; 

app.use(expressLayouts)
app.use(express.static("assets")) ; 
app.use(express.urlencoded()) ; 
app.use(cookieparser()) ; 
app.use("/" , require("./routes/homePageRouter")) ; 

app.listen(port , function(error){
    if(error){
        console.error(`Server was not able to start due to: ${error}`) ; 
        return ; 
    }
    console.log(`Server is up and running on port no: ${port}`) ; 
    return ; 
}) ;