const mysql = require('mysql2');

const mySqlpool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "student_db",
    port: 3306,
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from('')
    }
});

module.exports = mySqlpool;
