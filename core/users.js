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
    }
}

module.exports = User;