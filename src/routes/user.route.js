/** @format */

const { Router } = require("express");

const router = Router();

const userCtrl = require("../controllers/user.controller");

// @params req
// @params res
// @params next

router.post("/createUser", userCtrl.createUser); // create new user

module.exports = router;
