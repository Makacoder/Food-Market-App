// require dependencies
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
//  creating connection to database
const { DATABASE_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database Connected ");
  } catch (error) {
    console.log("Database not connected");
  }
};
//   exporting modules
module.exports = connectDB();
