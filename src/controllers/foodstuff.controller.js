/** @format */


const db = require("../database/postgresdb");
const dotenv = require("dotenv");
dotenv.config();

exports.addFoodStuff = async (req, res, next) => {
  try {
    const { name, image, amount } = req.body;
    // validating reg.body with joi
    // await validateEvent.validateAsync(req.body);

    //  Creating new Event
    const { rows } = await db.query(
      "INSERT INTO events (name, image, amount) VALUES ($1, $2, $3)",
      [name, image, amount]
    );
    return res.status(201).json({
      message: "Foodstuff created Successfully",
      body: {
        Foodstuff: { name, image, amount },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
