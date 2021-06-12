var express = require('express');
var path = require('path');
var app = express();
const User = require('./core/users')
const pageRouter = require('./routes/signup');
// var fs =require('fs');
// var sessions =require('express-session');
// var bodyParser = require('body-parser');
// import bodyParser;
const user = new User();
var session;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile('./HTML/Home.html', { root: __dirname });
    // console.log('just send');
});

app.get('/signup', (req, res) => {
    res.sendFile('./HTML/signup.html', { root: __dirname });
    // console.log('just send');
});
app.get('/login', (req, res) => {
    res.sendFile('./HTML/login.html', { root: __dirname });
    // console.log('just send');
});
app.get('/student/dashboard', (req, res) => {
    res.sendFile('./HTML/student_dashboard.html', { root: __dirname });
    // console.log('just send');
});
app.get('/teacher/dashboard', (req, res) => {
    res.sendFile('./HTML/teacher_dashboard.html', { root: __dirname });
    // console.log('just send');
});
app.get('/teacher/info', (req, res) => {
    res.sendFile('./HTML/teacher_info.html', { root: __dirname });
    // console.log('just send');
});
app.get('/student/info', (req, res) => {
    res.sendFile('./HTML/student_info.html', { root: __dirname });
    // console.log('just send');
});
app.get('/student/test_history', (req, res) => {
    res.sendFile('./HTML/test_history.html', { root: __dirname });
    // console.log('just send');
});
app.get('/teacher/test_results', (req, res) => {
    res.sendFile('./HTML/test_results.html', { root: __dirname });
    // console.log('just send');
});
app.get('/teacher/quiz/create', (req, res) => {
    res.sendFile('./HTML/quiz_ques.html', { root: __dirname });
    // console.log('just send');
});

// app.use('/signup',pageRouter);


app.post('/user/signup', (req, res, next) => {
    let userInput = req.body;
    // console.log(userInput);

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
app.post('/student/info/save', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    // res.send('Done');

    user.update(obj, (resu) => {
        if (resu) {
            user.find(obj.email, function (result) {
                if (result && result.length > 0) {
                    console.log(result[0])
                    res.send(result[0]);
                    return;
                }
                else {
                    // console.log('email not macthed');
                    res.send(null);
                    return;
                }
            })
        }
        else {
            res.send(null);
        }
    });
});
app.post('/teacher/info/save', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    // res.send('Done');

    user.update(obj, (resu) => {
        if (resu) {
            user.find(obj.email, function (result) {
                if (result && result.length > 0) {
                    console.log(result[0])
                    res.send(result[0]);
                    return;
                }
                else {
                    // console.log('email not macthed');
                    res.send(null);
                    return;
                }
            })
        }
        else {
            res.send(null);
        }
    });
});
app.post('/teachers/create/quiz', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    // res.send(obj);
    user.create_quiz(obj, (resu) => {
        if (resu) {
            user.find_quiz(obj.title,(result)=>{
                if (result && result.length > 0) {
                    console.log(result[0])
                    res.send(result[0]);
                    return;
                }
                else {
                    // console.log('email not macthed');
                    res.send(null);
                    return;
                }
            });
        }
        else {
            res.send(null);
        }
    });
    
});
app.post('/teacher/quiz/create/add_ques', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    res.send(obj);
    // user.create_quiz(obj, (resu) => {
    //     if (resu) {
    //         user.find_quiz(obj.title,(result)=>{
    //             if (result && result.length > 0) {
    //                 console.log(result[0])
    //                 res.send(result[0]);
    //                 return;
    //             }
    //             else {
    //                 // console.log('email not macthed');
    //                 res.send(null);
    //                 return;
    //             }
    //         });
    //     }
    //     else {
    //         res.send(null);
    //     }
    // });
    
});


// app.post('/register', (req, res) => {
//     res.send(req.body);
//     console.log('send signup data', req.body);
// });



app.listen(80, function () {
    console.log('listennig on localhost');
});