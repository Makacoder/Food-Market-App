/** @format */

const foodPackages = require("../models/foodpackage.model");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const db = require("../database/postgresdb");

// const { validatefoodpackage } = require('../middleware/validiate.middleware');

// placing a foodstuff package
const foodPackage = async (req, res, next) => {
  try {
    const { numberOfPackages, package_id } = req.body;
    // validating reg.body with joi
    await validatepackage.validateAsync(req.body);

    let totalAmount = numberOfPackages * amount;

    // new foodstuff package
    const newpackage = await db.query(
      "INSERT INTO Package ( numberOfPackages, totalAmount, foodStuff_id) VALUES ($1, $2, $3) RETURNING *",
      [numberOfPackages, totalAmount, package_id]
    );
    return successResMsg(res, 201, {
      message: " Foodstuff package added",
      newpackage: newpackage.rows[0],
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  foodstuff payment with flutterwave

const foodPackagePayment = async (req, res, next) => {
  try {
    const { id } = req.headers;
    const booking = await db.query("SELECT id FROM foodPackage");
    const data = await axios({
      url: "https://api.flutterwave.co/transaction/initialize",
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.Flutterwave_Secret}`,
      },
      data: {
        email: "makacoder@gmail.com",
        amount: "7000000",
      },
    });
    return res.status(200).json({
      data: data.data.data,
      foodstuff: foodstuff.rows,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//   package payment using paystack
const paymentVerification = async (req, res, next) => {
  try {
    const { reference } = req.query;
    const data = await axios({
      url: `https://api.flutterwave.co/transaction/verify/${reference}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${process.env.Flutterwave_Secret}`,
      },
      data: {
        email: "makacoder@gmail.com",
        amount: "7000000",
      },
    });
    return res.status(200).json({
      data: data.data.data.gateway_response,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  foodPackages,
  foodPackagePayment,
  paymentVerification,
};
