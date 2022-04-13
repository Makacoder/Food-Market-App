//  Dependencies
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/sendMail");
const {
  validiateUser,
  UserLogin,
} = require("../middleware/validate.middleware");
const db = require("../database/mysqldb");

//  creating  a user
const createUser = async (req, res, next) => {
  try {
    const { firstname, lastname, phonenumber, email, password } = req.body;
    // validating reg.body with joi
    //  await validiateUser.validateAsync(req.body);
    // checking if a user already has an account
    const [user] = await db.execute(
      "SELECT `email` FROM `users` WHERE `email` = ?",
      [req.body.email]
    );

    if (user.length > 0) {
      return res.status(400).json({
        message: "the email already exist",
      });
    }
    //  hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    // creating a new user
    const [newUser] = await db.execute(
      "INSERT INTO users (firstname, lastname, email, phonenumber, password) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, phonenumber, hashPassword]
    );
    // creating a payload
    const data = {
      id: newUser.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      role: req.body.role,
      // isVerified: req.body.isVerified,
    };
    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "2h",
    });

    //  verifying email address with nodemailer
    let mailOptions = {
      to: newUser.email,
      subject: "Verify Email",
      text: `Hi ${firstname}, Pls verify your email.
       ${token}`,
    };
    await sendMail(mailOptions);
    return res.status(201).json({ message: "User created", data, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// verifying Email

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decodedToken = await jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await db.execute("SELECT * FROM users WHERE email = ?", [
      {
        email: decodedToken.email,
      },
    ]);

    if (user.verified) {
      return res.status(200).json({
        message: "user verified already",
      });
    }

    const verify = await db.execute(
      "UPDATE users SET isVerified = true WHERE isVerified = false"
    );
    return res.status(201).json({ message: "User verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// logging in a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validate with joi
    // await UserLogin.validateAsync(req.body);
    //  checking email and password match
    if (email && password) {
      const [user] = await db.execute("SELECT * FROM users WHERE email =?", [
        email,
      ]);
      if (user.length === 0) {
        return res.status(400).json({
          message: "email address not found.",
        });
      }
      const passMatch = await bcrypt.compare(password, user[0].password);
      if (!passMatch) {
        return res.status(400).json({ message: "incorrect paaword" });
      }
      if (user[0].isVerified === 0) {
        return res.status(400).json({
          message: "Unverified account.",
        });
      }
    }
    // creating a payload
    const data = {
      email: email.email,
      role: email.role,
    };

    const token = await jwt.sign(data, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "User logged in sucessfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  verifyEmail,
};
