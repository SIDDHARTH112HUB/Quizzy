const util= require('util');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '123456789',
    database: 'trialquizzy'
});

pool.getConnection((err,connection)=>{
    if(err)
    {
       throw err;
    }
    if(connection)
    {
        connection.release();
    }
    return;
});
pool.query = util.promisify(pool.query);
module.exports = pool;