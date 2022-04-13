/** @format */
const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/createAdmin", createAdmin); // sign up new Admin
router.post("/loginAdmin", loginAdmin); // Admin login

module.exports = router;
