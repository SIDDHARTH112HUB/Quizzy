const { genSaltSync } = require('bcrypt');
const { CONNREFUSED } = require('dns');
var express = require('express');
var path = require('path');
var app = express();

//uploading image 
const multer = require('multer');
const uploads = multer({ dest: /images/ });


const User = require('./core/users')
const pageRouter = require('./routes/signup');
// var fs =require('fs');
// var sessions =require('express-session');
// var bodyParser = require('body-parser');
// import bodyParser;
const user = new User();
var session;


app.use(express.urlencoded({ extended: true }));
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
app.get('/student/solve/quiz', (req, res) => {
    res.sendFile('./HTML/solve_quiz.html', { root: __dirname });
    // console.log('just send');
});
app.get('/teacher/quiz/result', (req, res) => {
    res.sendFile('./HTML/quiz_result.html', { root: __dirname });
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
    // console.log(obj);
    // res.send('Done');

    user.update(obj, (resu) => {
        if (resu) {
            user.find(obj.email, function (result) {
                if (result && result.length > 0) {
                    // console.log(result[0])
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
    // console.log(obj);
    // res.send('Done');

    user.update(obj, (resu) => {
        if (resu) {
            user.find(obj.email, function (result) {
                if (result && result.length > 0) {
                    // console.log(result[0])
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
    // console.log(obj);
    // res.send(obj);
    user.create_quiz(obj, (resu) => {
        if (resu) {
            user.find_quiz(resu.insertId, (result) => {
                if (result && result.length > 0) {
                    // console.log(result[0])
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
app.post('/teacher/quiz/create/add_ques/update', (req, res, next) => {
    let obj = {
        correctoption: 'jnnfsjkn',
        ques_id: '18'
    }
    user.find_correct_option(obj, (result) => {
        // console.log(result.id, 'don');
        res.send('don');
    });
});

app.post('/teacher/quiz/create/add_ques', (req, res, next) => {
    let obj = req.body;
    // console.log(obj);
    let quesid;
    let ob = {
        quiz_id: obj.quiz_id,
        time: obj.time,
        marks: obj.marks,
        created_by: obj.created_by,
        name: obj.ques_name
    }
    user.create_quiz_question(ob, (resu) => {
        if (resu) {
            quesid = resu.insertId;
            // res.send(resu.insertId);
            // console.log(quesid, 'andarhu');
            let obj1 = {
                ques_id: quesid,
                time: obj.time,
                name: obj.option1,
                created_by: obj.created_by
            }
            // console.log(obj1);
            //    res.send('done');
            let obj2 = {
                ques_id: quesid,
                time: obj.time,
                name: obj.option2,
                created_by: obj.created_by
            }
            // console.log(obj2);
            let obj3 = {
                ques_id: quesid,
                time: obj.time,
                name: obj.option3,
                created_by: obj.created_by
            }
            // console.log(obj3);
            let obj4 = {
                ques_id: quesid,
                time: obj.time,
                name: obj.option4,
                created_by: obj.created_by
            }
            let obj5 = {
                correctoption: obj.correctoption,
                ques_id: quesid
            }
            // // console.log(obj4);
            let final = [];
            final.push(obj1);
            final.push(obj2);
            final.push(obj3);
            final.push(obj4);



            user.create_quiz_options(final, (res4) => {
                user.find_correct_option(obj5, (res3) => {
                    if (res3) {
                        // console.log(res3);
                        user.update_quiz_question(quesid, res3.id, function (res1) {
                            if (res1) {
                                console.log('done');

                            }
                            else {
                                console.log('error');
                            }

                        });
                    }
                });
            });



        }
        else {
            res.send(null);
        }
    });


    res.send('done');

});
app.post('/teacher/quiz/create/publish', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    // res.send(obj);
    user.update_quiz_status(obj, (resu) => {
        if (resu)
            res.send('done')
    });

});
app.post('/teachers/dashboard/getquizzes', (req, res, next) => {
    let obj = req.body;
    // console.log(obj);
    // res.send(obj);
    // res.send('done mil gya mujhe');
    user.get_quizzes_teachers(obj.useremail, obj.status, (result) => {
        // console.log(result);
        if (result && result.length > 0) {
            // console.log('iside if',result);
            res.send(result);
        }
        else {
            res.send({});
        }


    });
});
app.post('/student/dashboard/getquizzes', (req, res, next) => {
    let obj = req.body;
    // console.log(obj);
    user.get_quizzes_student(obj.userid, (result) => {
        if (result && result.length > 0) {

            res.send(result);
        }
        else {
            res.send({});
        }

    });
});
app.post('/teacher/testresult', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    user.get_quizzes_teachers(obj.useremail, obj.status, (result) => {
        // console.log(result);
        if (result && result.length > 0) {
            // console.log('iside if',result);
            res.send(result);
        }
        else {
            res.send({});
        }


    });
    // res.send('result');
});
app.post('/student/dashboard/testhistory', (req, res, next) => {
    let obj = req.body;
    console.log(obj);
    //  res.send('hjsffdj');
    user.get_testhistory_student_quizzes(obj.userid, (result) => {
        if (result) {

            // console.log(result);
            // console.log(result[0]);
            console.log(result)
            res.send(result);
        }
        else {
            console.log('in else');
            res.send({});
        }

    });
});
app.post('/student/dashboard/noOfTests', (req, res, next) => {
    let obj = req.body;
    console.log(obj, 'test wala');

    user.get_noOfTests_student(obj.userid, (result) => {
        if (result) {
            console.log(result[0]['count(quiz_id)']);
            let nooftests = result[0]['count(quiz_id)'];
            console.log(nooftests);
            res.send(result[0]);
        }
        else {
            res.send({});
        }

    });
});
app.post('/student/dashboard/OverallTestaverage', (req, res, next) => {
    let obj = req.body;
    // console.log(obj);
    user.get_OverallTestaverage_student(obj.userid, (result) => {
        if (result ) {
            // console.log(result,'hmi hai');
            // let avgerage=result[0]['AVG(s)'];
            // console.log(avgerage);
            res.send(result[0]);
        }
        else {
            res.send({});
        }

    });
});

app.get('/quizzes/:quizid/questions', (req, res, next) => {
    let quizid = req.params['quizid'];
    console.log(quizid);
    user.get_quiz_questions(quizid, (questions) => {
        let questionIds = [];
        let questionMap = {};
        questions.forEach(element => {
            questionIds.push(element.id);
            element.options = [];
            questionMap[element.id] = element;
        });
        user.get_questions_options(questionIds, (options) => {
            options.forEach(option => {
                let qId = option.question_id;
                questionMap[qId].options.push(option);
            });
            questions = [];
            for (let key in questionMap) {
                questions.push(questionMap[key]);
            }
            // console.log(questions);
            res.send(questions);
        })
    })
});
app.get('/quizzes/:quizid/question/option', (req, res, next) => {
    let quizid = req.params['quizid'];
    // console.log(quizid);
    user.get_quiz_questions(quizid, (questions) => {
        let questionIds = [];
        let questionMap = {};
        questions.forEach(element => {
            questionIds.push(element.id);
            let qobj = {
                que_id: element.id,
                quiz_id: element.quiz_id,
                qname: element.name
            }
            qobj.options = [];
            questionMap[element.id] = qobj;
        });
        user.get_questions_options(questionIds, (options) => {
            options.forEach(option => {
                let qId = option.question_id;
                let opobj = {
                    name: option.name,
                    id: option.id
                }
                questionMap[qId].options.push(opobj);
            });
            questions = [];
            for (let key in questionMap) {
                questions.push(questionMap[key]);
            }
            // console.log(questions);
            res.send(questions);
        })
    })
})

app.post('/student/quiz/submit', (req, res) => {
    var ob = req.body
    let n = ob.len;
    let qid = ob.quiz_id;
    let usr_id = ob.user_id;
    let user_quiz = [
        usr_id,
        qid
    ];
    console.log(ob);
    user.set_user_quiz(user_quiz, (result) => {
        if (result) { console.log('milgya'); }
        else {
            console.log('nahi mila');
        }
    })
    if (ob.que_option) {
        ob.que_option.forEach(element => {
            let ques = element.que_id;
            user.get_ques_detail(ques, (resu) => {
                let marks;
                if (resu[0].correct_option_id == element.opt_id) {
                    marks = resu[0].correct_points;
                }
                else {
                    marks = 0;
                }
                let user_response = [
                    marks,
                    element.opt_id,
                    ques,
                    qid,
                    usr_id
                ];
                user.set_user_response(user_response, (resu1) => {
                    if (resu1) { console.log('aa gya'); }
                    else {
                        console.log('nahi aaya');
                    }
                });

            })
        });
    }
    else {
        let marks;
        let ques;
        let user_response = [
            0,
            null,
            null,
            qid,
            usr_id
        ];
        user.set_user_response(user_response, (resu1) => {
            if (resu1) { console.log('aa gya'); }
            else {
                console.log('nahi aaya');
            }
        });
    }

    res.send('sab solved');

});

app.get('/quiz/:quizid/result', (req, res, next)=>{
    let quizid = req.params['quizid'];
    // console.log(quizid);
    user.get_user_result(quizid,(result)=>{
        console.log(result);
        res.send(result);
    })
})

app.listen(80, function () {
    console.log('listennig on localhost');
});