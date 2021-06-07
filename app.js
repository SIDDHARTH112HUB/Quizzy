var express = require('express');
var path = require('path');
var app= express();
const User = require('./core/users')
const pageRouter =require('./routes/signup');
// var fs =require('fs');
// var sessions =require('express-session');
// var bodyParser = require('body-parser');
var sessions = require('express-session');
// import bodyParser;
const user = new User();
var session;

app.use(sessions({
    secret : 'snkcknd7376ecccdaad',
    resave : false,
    saveUninitialized : true
}));
app.use(express.urlencoded({extended: false})); 
app.use(express.json());

app.use('/',express.static(__dirname));



app.get('/',(req,res)=>{
    res.sendFile('./HTML/login.html',{root : __dirname});
    console.log('just send');
});

// app.use('/signup',pageRouter);

app.get('/signup',(req,res)=>{
    res.sendFile('./HTML/signup.html',{root : __dirname});
    console.log('signup_page _opened');
});


app.post('/login',(req,res,next)=>{
    let obj=req.body;
    // res.send(obj);
    user.login(obj.email,obj.password,(result)=>{
        console.log('hi again',result);
        if(result){
            res.send(result)
            // console.log(result.user_profile);
            // if(result.user_profile=="Student")
            // return res.redirect('./HTML/student_dashboard.html');
            // else if(result.user_profile=="Teacher")
            // return res.redirect('./HTML/teacher_dashboard.html');
            
        }
        else{
            res.send('email/password incorrect '+ obj.password);
        }
    })
});

app.post('/register',(req,res)=>{
    res.send(req.body);
    console.log('send signup data');
});



app.listen(80,function(){
    console.log('listennig on 1337');
});