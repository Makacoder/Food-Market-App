/** @format */
const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

router.post("/createUser", createUser); // signup new user
router.post("/loginUser", loginUser); // new user login

module.exports = router;
