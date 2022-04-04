/** @format */

// Packages Modules
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Modules
//  const userRoute = require('./routes/user.route');

// Database connection

// MAIN ENTRY POINT
app.get("/", (req, res) => {
  res.json({ message: "This is the main application entry point" });
});

// app.use('/api/v1/', userRoute)

const { PORT } = process.env;
const connection = require("./database/db");
connection.getConnection(function (err) {
  if (err) throw err;
  console.log("Database connected");
  let createFoodMarket =
    "CREATE TABLE users(id int PRIMARY KEY AUTO_INCREMENT,firstname varchar(30), lastname varchar(30),phonenumber varchar(30), email varchar(30) UNIQUE,)";
  connection.query(createFoodMarket, function (err, result) {
    if (err) throw err;
    console.log("table created");
  });
});

// app.use('/api/v1', userRoute);
// app.listen(PORT, () => {
//   console.log(`The app is running at ${PORT}`);

//   connection.end(function (err) {
//     if (err) {
//       return console.error("error: " + err.message);
//     }
//     console.log("Connected to the MySQL server.");

// });

// module.exports = app;
