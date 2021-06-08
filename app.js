var express = require('express');
var path = require('path');
var app = express();
const User = require('./core/users')
const pageRouter = require('./routes/signup');
// var fs =require('fs');
// var sessions =require('express-session');
// var bodyParser = require('body-parser');
var sessions = require('express-session');
// import bodyParser;
const user = new User();
var session;

app.use(sessions({
    secret: 'snkcknd7376ecccdaad',
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('./HTML/Home.html', { root: __dirname });
    console.log('just send');
});

app.get('/signup', (req, res) => {
    res.sendFile('./HTML/signup.html', { root: __dirname });
    console.log('just send');
});
app.get('/login', (req, res) => {
    res.sendFile('./HTML/login.html', { root: __dirname });
    console.log('just send');
});
app.get('/student/dashboard', (req, res) => {
    res.sendFile('./HTML/student_dashboard.html', { root: __dirname });
    console.log('just send');
});
app.get('/teacher/dashboard', (req, res) => {
    res.sendFile('./HTML/teacher_dashboard.html', { root: __dirname });
    console.log('just send');
});
app.get('/teacher/info', (req, res) => {
    res.sendFile('./HTML/teacher_info.html', { root: __dirname });
    console.log('just send');
});
app.get('/student/info', (req, res) => {
    res.sendFile('./HTML/student_info.html', { root: __dirname });
    console.log('just send');
});
app.get('/student/test_history', (req, res) => {
    res.sendFile('./HTML/test_history.html', { root: __dirname });
    console.log('just send');
});
app.get('/teacher/test_results', (req, res) => {
    res.sendFile('./HTML/test_results.html', { root: __dirname });
    console.log('just send');
});

// app.use('/signup',pageRouter);


app.post('/user/signup', (req, res, next) => {
    let userInput = req.body;
    console.log(userInput);

    user.create(userInput, function (lastId) {
        if (lastId) {
            res.send('true');
        }
        else {
            res.send(null);
        }
    })

});
app.post('/user/login', (req, res, next) => {
    let obj = req.body;
    // console.log(obj);
    if (obj.email != null && obj.password != null) {

        user.login(obj.email, obj.password, (result) => {
            if (result) {
                res.send(result)
            }
            else {
                res.send(null);
            }
        });
    }
});

app.post('/register', (req, res) => {
    res.send(req.body);
    console.log('send signup data', req.body);
});



app.listen(80, function () {
    console.log('listennig on 1337');
});