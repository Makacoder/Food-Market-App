/** @format */
const mysql = require("mysql2");
require("dotenv").config();

// const { DB_PASS, DB_NAME } = process.env;

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "maka2022",
  database: "foodmarket",
})
connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server.");
});

module.exports = connection.promise();
