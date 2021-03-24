let mysql = require('mysql');
let Promise = require('bluebird');
exports.conn = mysql.createConnection({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "ablog",
    debug: false
});

exports.queryAsync = Promise.promisify(exports.conn.query.bind(exports.conn));