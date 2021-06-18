const pool = require('./pool');
const bcrypt = require('bcrypt');
// const multer=require('multer');
// const uploads=multer({dest:/images/});

function User() { };

User.prototype = {
    find: function (user = null, callback) {
        if (user) {
            var field = Number.isInteger(user) ? 'id' : 'email';
        }
        let sql = `SELECT * FROM users WHERE ${field}=?`;
        // console.log(field);
        // console.log(user);
        pool.query(sql, user, (err, result) => {
            if (err) throw err
            else {
                // console.log(result);
                // console.log('12345');
                callback(result);
            }

        });
    },
    create: function (obj, callback) {
        // let pwd= body.password;
        // body.password=bcrypt.hashSync(pwd,10);

        let sql = "INSERT INTO users(user_name,email,user_password,user_profile) VALUES('" + obj.full_name + "','" + obj.email + "','" + obj.password + "','" + obj.userType + "')";

        pool.query(sql, function (err, lastId) {
            if (err) throw err;
            console.log(lastId);
            callback(lastId);
        });
    },
    login: function (email, password, callback) {
        this.find(email, function (result) {
            if (result && result.length > 0) {
                var s = result[0].user_password;
                if (password === s) {
                    callback(result[0]);
                    return;
                }
                else {
                    callback(null);
                    return;
                }
            }
            else {
                console.log('email not macthed');
                callback(null);
                return;
            }
        });
    },
    update: function (obj, callback) {
        let sql = `UPDATE users SET user_name = ?, college = ?, user_contact = ? , user_password = ? WHERE email = ?` 
        let data = [
            obj.user_name,
            obj.college,
            obj.mobile,
            obj.password,
            obj.email
        ]
        pool.query(sql, data, function (err, resu) {
            if (err) throw err;
            if (resu) {
                callback(resu);
                return;
            }
            callback(null);
            return;
        });
    },
    create_quiz : function(obj,callback){
        let sql = "INSERT INTO quizzes(created,created_by,name,title) VALUES('" + obj.time + "','" + obj.created_by + "','" + obj.quiz_name + "','" + obj.title + "')";
        pool.query(sql, function (err, lastId) {
            if (err) throw err;
            // console.log(lastId);
            callback(lastId);
            return;
        });
        
    },
    find_quiz : function (id = null, callback) {
        
        // console.log(field);
        // console.log(user);
        let sql2= `SELECT * FROM quizzes WHERE id=?`;
        pool.query(sql2,id,(err,result)=>{
            if (err) throw err
            else {
                // console.log(result);
                // console.log('12345');
                callback(result);
            }
        });
    },
    update_quiz_status : function(obj , callback){
        let sql = "UPDATE quizzes SET quiz_status = 'Publish' WHERE id = "+obj.quiz_id+"";
        pool.query(sql,function(err,LastId){
            if(err) throw err;
            else{
                // console.log(LastId);
                callback(LastId);
            }
        });
    },
    create_quiz_question :function(obj,callback){
        let sql = "INSERT INTO questions (`created`, `created_by`, `correct_points`, `name`,  `quiz_id`) VALUES (?,?,?,?,?)";
        pool.query(sql,[obj.time,obj.created_by,obj.marks,obj.name,obj.quiz_id], function (err, lastId) {
            if (err) throw err;
            // console.log(lastId);
            callback(lastId);
        });
    },
    create_quiz_options:function(objs, callback){
        let sql = "INSERT INTO options (created, created_by,name,question_id) VALUES ";
        for(let i = 0; i < objs.length; i++) {
            let obj = objs[i];
            if(i != 0) {
                sql += ", ";
            }
            sql += "('" + obj.time + "','" + obj.created_by + "','" + obj.name + "','" + obj.ques_id + "')";
        }
        console.log(sql);
        pool.query(sql, function (err, lastId) {
            if (err) throw err;
            callback(lastId);
            return;
        });
    },
    
    find_correct_option:function(obj,callback){
        
        let data=[obj.correctoption,obj.ques_id];
        // console.log(data);
        let sql = `SELECT id FROM options WHERE name=? and question_id=?`;
        pool.query(sql,data, (err, result) => {
            if (err) throw err
            else {
                callback(result[0]);
                return;
            }

        });
    },
    update_quiz_question:function(quesid,correctoption,callback){
        let sql="UPDATE questions SET correct_option_id="+correctoption+" where id ="+quesid+""
        pool.query(sql, (err, result) => {
            if (err) throw err
            else {
                // console.log(result);
                // console.log('12345');
                callback(result);
                return;
            }

        });
    },
    get_quizzes_teachers : function(useremail,status,callback){
        let ob=[useremail,status]
        let sql = "SELECT * FROM quizzes where created_by = ? and quiz_status=?";
        pool.query(sql,ob,(err,result)=>{
            if(err)throw err
            else{
                // console.log(result);
                callback(result);
                return;
            }
        })
    },
    get_quiz_questions : function(quizid, callback){
        let ob = [quizid]
        let sql = "SELECT * FROM questions where quiz_id = ?";
        pool.query(sql, ob, (err, result) => {
            if(err)throw err
            else{
                callback(result);
                return;
            }
        })
    },
    get_questions_options : function(questionIds, callback){
        if(!questionIds || questionIds.length == 0){
            callback([]);
            return;
        }
        let sql = "SELECT * FROM options where question_id in (?)";
        pool.query(sql, [questionIds], (err, result) => {
            if(err)throw err
            else{
                callback(result);
                return;
            }
        })
    },
    get_question_options : function(question_id, callback){
        let sql = "SELECT * FROM options where question_id = ?";
        pool.query(sql, [question_id], (err, result) => {
            if(err)throw err
            else{
                callback(result);
                return;
            }
        });
    },
    set_user_quiz : function(ob,callback){
        let sql ="INSERT INTO users_quizzes (`usr_id`, `quiz_id`) VALUES (?,?)";
        pool.query(sql,ob,(err,result)=>{
            if(err)throw err
            else{
                callback(result);
                return;
            }
        })
    },
    get_quizzes_student : function(ob,callback){
        
        let sql = "select id,name,title from quizzes q1 where quiz_status='Publish' and "+ob+" not in (select usr_id from users_quizzes q2 where quiz_id =q1.id) ";
        pool.query(sql,(err,result)=>{
            if(err)throw err
            else{
                // console.log(result);
                callback(result);
                return;
            }
        });
    },
    get_testhistory_student_quizzes: function(id,callback){
        
        let sql = "select  q2.name,q2.title ,q1.* from (select quiz_id , SUM(points) from user_quiz_responses where usr_id="+id+" Group By quiz_id ) as q1 join (select name ,title,id from quizzes) as q2 on q1.quiz_id=q2.id;";
        pool.query(sql,(err,result)=>{
            if(err)throw err
            else{
                // console.log(result);
                callback(result);
                return;
            }
        });
    },
    get_users_marks: function(ob,callback){
        
        let sql = "select SUM(points) from user_quiz_responses where quiz_id="+id+" and usr_id="+id+"";
        pool.query(sql,(err,result)=>{
            if(err)throw err
            else{
                // console.log(result);
                callback(result);
                return;
            }
        });
    },
    get_noOfTests_student : function(ob,callback){
        
        let sql = "select count(quiz_id) from users_quizzes where usr_id=? ";
        pool.query(sql,ob,(err,result)=>{
            if(err)throw err
            else{
                // console.log(result);
                callback(result);
                return;
            }
        });
    },
    get_OverallTestaverage_student : function(ob,callback){
        
        let sql = "select AVG(s) from (select quiz_id , SUM(points) as s from user_quiz_responses where usr_id=? Group By quiz_id ) as q1; ";
        pool.query(sql,ob,(err,result)=>{
            if(err)throw err
            else{
                console.log(result);
                callback(result);
                return;
            }
        });
    },
    get_ques_detail :function(ques,callback){
        let sql= "select correct_option_id,correct_points,negative_points from questions where id='"+ques+"'";
        pool.query(sql,(err,result)=>{
            if(err) throw err 
            else{
                callback(result);
                return;
            }
        })
    },
    set_user_response : function(ob,callback){
        let sql ="INSERT INTO user_quiz_responses (points,option_id,question_id,quiz_id,usr_id ) VALUES ('"+ob[0]+"',"+ob[1]+","+ob[2]+","+ob[3]+","+ob[4]+")";
        pool.query(sql,(err,result)=>{
            if(err)throw err
            else{
                callback(result);
                return;
            }
        })
    },
    get_user_result : function(quizid,callback){
        console.log(quizid);
        let sql="select  q2.user_name,q2.email,q1.* from (select quiz_id,usr_id , SUM(points) as marks from user_quiz_responses where quiz_id='"+quizid+"' Group By usr_id ) as q1 join (select user_name ,email,user_id from users) as q2 on q1.usr_id=q2.user_id;"
        pool.query(sql,(err,result)=>{
            if(err)throw err
            else{
                callback(result);
                return;
            }
        })
    }

}

module.exports = User;