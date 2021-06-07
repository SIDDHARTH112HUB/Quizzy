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
    res.sendFile('./HTML/Home.html',{root : __dirname});
    console.log('just send');
});

app.get('/signup',(req,res)=>{
    res.sendFile('./HTML/signup.html',{root : __dirname});
    console.log('just send');
});
app.get('/login',(req,res)=>{
    res.sendFile('./HTML/login.html',{root : __dirname});
    console.log('just send');
});
app.get('/student/dashboard',(req,res)=>{
    res.sendFile('./HTML/student_dashboard.html',{root : __dirname});
    console.log('just send');
});
app.get('/teacher/dashboard',(req,res)=>{
    res.sendFile('./HTML/teacher_dashboard.html',{root : __dirname});
    console.log('just send');
});

// app.use('/signup',pageRouter);


app.post('/user/signup', (req, res, next) => {
    //do singup work here
});
app.post('/user/login',(req,res,next)=>{
    let obj=req.body;
    user.login(obj.email,obj.password,(result)=>{
        if(result){
            res.send(result) 
        }
        else{
            res.send('email/password incorrect '+ obj.password);
        }
    })
});

app.post('/register',(req,res)=>{
    res.send(req.body);
    console.log('send signup data',req.body);
});



app.listen(80,function(){
    console.log('listennig on 1337');
});