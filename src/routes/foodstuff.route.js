/** @format */

const Foodstuff = require("../controllers/foodstuff.controller");
const express = require("express");
const router = express.Router();

router.post("/createFoodStuff", Foodstuff.addFoodStuff);

module.exports = router;
