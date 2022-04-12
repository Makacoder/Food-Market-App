/** @format */
const express = require("express");
const { createAdmin, loginAdmin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/createAdmin", createAdmin); // create new Admin
router.post("/loginAdmin", loginAdmin); // create Admin login

module.exports = router;
