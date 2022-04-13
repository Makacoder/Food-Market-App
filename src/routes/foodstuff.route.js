/** @format */

//  dependencies
const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middleware/auth.middleware");
const {
  addFoodstuff,
  fetchAllFoodstuff,
} = require("../controllers/foodstuff.controller");
const upload = require("../utils/multer");
//  creating  route
router.post(
  "/createFoodstuff",
  // authenticate,
  // authorize,
  upload.array("pictures"),
  addFoodstuff
);
router.get("/showAllFoodstuff", fetchAllFoodstuff);

//    exporting modules
module.exports = router;
