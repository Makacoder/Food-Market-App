/** @format */
const mysql = require("mysql2");
require("dotenv").config();


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

  console.log("Connected to Makanaki MySQL server.");
});

module.exports = connection.promise();
