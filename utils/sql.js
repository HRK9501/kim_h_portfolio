const sql = require('mysql');
const config = require('../config');

const connect = sql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit : 20,
    queueLimit : 100,
    waitForConnections : true
});

module.exports = connect;