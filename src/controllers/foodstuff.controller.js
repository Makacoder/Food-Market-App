/** @format */
const foodstuff = require("../models/foodstuff.model");
const cloudinaryUploadMethod = require("../utils/cloudinary.js");
const path = require("path");
const express = require("express");
const router = express.Router();
const AppError = require("../utils/appError");
const upload = require("../utils/multer");
const db = require("../database/postgresdb");

// add new foodstuff
exports.addFoodstuff = async (req, res, next) => {
  try {
    const urls = [];
    const files = req.files;
    if (!files) return next(new AppError("No picture attached..", 400));
    for (const file of files) {
      const { path } = file;
      const newPath = await cloudinaryUploadMethod(path);

      urls.push(newPath);
    }
    images = urls.map((url) => url.res);

    const { foodname, amount, images } = req.body;
    // validating reg.body with joi
    // await validateEvents.validateAsync(req.body);
    const foodstuff = await db.query(
      "INSERT INTO foodstuff (foodname, amount, images) VALUES ($1, $2, $3, $4) RETURNING *",
      [foodname, amount, images]
    );
    return res.status(201).json({
      message: "Foodstuff created",
      data: foodstuff.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

//   fetch all available foodstuffs

exports.fetchAllFoodstuff = async (req, res, next) => {
  try {
    const { page } = req.query;
    // pagination
    const allFoodstuff = await db.query(
      `SELECT * FROM foodstuff Order By id LIMIT 5 OFFSET ${(page - 1) * 5}`
    );
    if (
      allFoodstuff.rows[0] == null ||
      !allFoodstuff.rows[0] ||
      allFoodstuff.rows[0] == []
    ) {
      return res.status(404).json({
        message: "page not found",
      });
    }
    const count = await db.query("SELECT COUNT(*)FROM foodstuff");
    return successResMsg(res, 200, {
      message: "Foodstuff fetch successfully",
      count: count.rows[0],
      allFoodstuff: allFoodstuff.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
