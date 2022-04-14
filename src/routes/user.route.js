/** @format */
const express = require("express");
const { createUser, loginUser, payment } = require("../controllers/user.controller");

const router = express.Router();

router.post("/createUser", createUser); // signup new user
router.post("/loginUser", loginUser); // new user login
router.post("/auth/payment", payment);

module.exports = router;
