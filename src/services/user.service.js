/** @format */

const User = require("../models/user.model");
// const db = require("../databases/db");
// const customError = require("../utils/customError");

require("dotenv").config();

// console.log(users);

const userServices = {
  async fetchUsers(req, res) {
    const users = await db.execute("SELECT * FROM users");
    const validUsers = await users[0].map((user) => user);
    return validUsers;
  },

  async signUp(User) {
    let userDetails = {
      firstname: User.firstname,
      lastname: User.lastname,
      phonenumber: User.phonenumber,
      email: User.email,
      password: User.password,
    };
    try {
      const newUser = await db.execute(
        "INSERT INTO users (firstname, lastname, phonenumber, email,  password,) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          userDetails.firstname,
          userDetails.lastname,
          userDetails.phonenumber,
          userDetails.email,
          userDetails.password,
        ]
      );
      if (userDetails.email === email) {
        throw new Error("This email already exist");
      }
      return newUser;
    } catch (error) {
      console.log(error);
      return new customError(500, "Server Error");
    }
  },

  async login(email) {
    try {
      const users = await db.execute("SELECT * FROM users");
      const foundUser = users[0].find((user) => user.email == email);
      if (!foundUser) {
        return new customError(401, "user not found!");
      }

      return { foundUser } || {};
    } catch (error) {
      console.log(error);
      return new customError(500, "Server Error");
    }
  },
};

module.exports = userServices;
