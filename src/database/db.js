/** @format */
const mysql = require("mysql");
require("dotenv").config();

// const { DB_PASS, DB_NAME } = process.env;

let connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "maka2022",
  database: "foodmarket",
})

module.exports = connection;
