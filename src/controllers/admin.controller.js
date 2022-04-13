//  Dependencies
const Admin = require("../models/admin.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { sendMail } = require("../utils/sendMail");
const {
  validiateAdmin,
  AdminLogin,
} = require("../middleware/validate.middleware");
const db = require("../database/mysqldb");

//  creating an Admin
const createAdmin = async (req, res, next) => {
  try {
    const { firstname, lastname, phonenumber, email, password } = req.body;
    
    // checking if an Admin already has an account
    const [admin] = await db.execute(
      "SELECT `email` FROM `admin` WHERE `email` = ?",
      [req.body.email]
    );

    if (admin.length > 0) {
      return res.status(400).json({
        message: "the email already exist",
      });
    }
    //  password hash
    const hashPassword = await bcrypt.hash(password, 10);

    // creating a new admin user
    const [newAdmin] = await db.execute(
      "INSERT INTO admin (firstname, lastname, email, phonenumber, password) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, phonenumber, hashPassword]
    );
    // creating a payload
    const data = {
      id: newAdmin.id,
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
      to: newAdmin.email,
      subject: "Verify Email",
      text: `Hi ${firstname}, Pls verify your email.
       ${token}`,
    };
    await sendMail(mailOptions);
    return res.status(201).json({ message: "Admin created", data, token });
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
    const Admin = await db.execute("SELECT * FROM users WHERE email = ?", [
      {
        email: decodedToken.email,
      },
    ]);

    if (admin.verified) {
      return res.status(200).json({
        message: "Admin verified already",
      });
    }

    const verify = await db.execute(
      "UPDATE admin SET isVerified = true WHERE isVerified = false"
    );
    return res.status(201).json({ message: "Admin verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// logging in an Admin
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validate with joi
    // await AdminLogin.validateAsync(req.body);
    //  checking email and password match
    if (email && password) {
      const [admin] = await db.execute("SELECT * FROM admin WHERE email =?", [
        email,
      ]);
      if (admin.length === 0) {
        return res.status(400).json({
          message: "email address not found.",
        });
      }
      const passMatch = await bcrypt.compare(password, admin[0].password);
      if (!passMatch) {
        return res.status(400).json({ message: "incorrect password" });
      }
      if (admin[0].isVerified === 0) {
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
      message: "Admin logged in sucessfully",
      token,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  verifyEmail,
};
