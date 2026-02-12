const mysql = require("mysql2");
require("dotenv").config();


const pool = mysql.createPool({
  uri: process.env.MYSQL_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool.promise();