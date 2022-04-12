/** @format */
const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/createUser", createUser); // create new user
router.post("/loginUser", loginUser); // create user login

module.exports = router;
