const development = {
    name : "Development" , 
    access_path : "/assets" , 
    session_cookie_key : "This is serious." , 
    db : "mongodb://localhost/SocialMediaDatabase" , 
    smtp : {
        service : 'gmail' , 
        host : 'smtp.gmail.com' , 
        port : 587 , 
        secure : false , 
        auth : {
            user: 'puru.bhargava011@gmail.com' , 
            pass : 'fsenrnvmxdbgiorh'
        } 
    } , 
    google_client_id : "863742172650-oq620v30cuptg9677mifs534f7dgpoic.apps.googleusercontent.com" , 
    google_client_secret : "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" , 
    google_call_back_url : "http://localhost:7777/users/auth/google/callback" 
}

module.exports = development ; 