const pool = require('./pool');
const bcrypt = require('bcrypt');

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
        });
        
    },
    find_quiz : function (id = null, callback) {
        
        // console.log(field);
        // console.log(user);
        let sql2= `SELECT * FROM quizzes WHERE id=?`;
        pool.query(sql2,id,(err,result)=>{
            if (err) throw err
            else {
                console.log(result);
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
                console.log(LastId);
                callback(LastId);
            }
        });
    },
    create_quiz_question :function(obj,callback){
        let sql = "INSERT INTO questions (`created`, `created_by`, `correct_points`, `name`,  `quiz_id`) VALUES (?,?,?,?,?)";
        pool.query(sql,[obj.time,obj.created_by,obj.marks,obj.name,obj.id], function (err, lastId) {
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
    }

}

module.exports = User;