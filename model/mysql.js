const mysql12 = require('mysql2');

const pool = mysql12.createPool({
    host:'192.168.1.5',
    user:'kim',
    database:'test123',
    password : '123123'
});

module.exports = pool.promise();