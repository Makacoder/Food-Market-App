/** @format */

const express = require("express");
const router = express.Router();
const {
  foodPackages,
  foodPackagePayment,
  paymentVerification,
} = require("../controllers/foodpackage.controller");
const { authenticate } = require("../middleware/auth.middleware");
//  creating route
router.post("/foodPackage", authenticate, foodPackages);
router.post("/payment", authenticate, foodPackagePayment);
router.get("/verification/payment", authenticate, paymentVerification);

module.exports = router;
