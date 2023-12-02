//const mysql = require('mysql2');
import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sistema_gerencial'
});

module.exports = pool;