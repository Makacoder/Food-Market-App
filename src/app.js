/** @format */

// Packages Modules
const express = require("express");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./utils/keys");
const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
const connectDB = require("./database/connectDB");
const foodStuffRoute = require("./routes/foodstuff.route");
const foodPackageRouter = require("./routes/foodpackage.route");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set view engine
app.set("view engine", "ejs");


// MAIN ENTRY POINT
app.get("/", (req, res) => {
  res.send({
    message: "Makanaki the Super Hacker",
  });
});

// google home page
app.get("/auth", (req, res) => {
  res.render("home", { user: req.user });
});

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookie_key],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Database referencing
const { PORT } = process.env;
const mysqldb = require("./database/mysqldb");
const postgresdb = require("./database/postgresdb");

//Database connections
mysqldb;
postgresdb;
connectDB;

//Setup Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", foodStuffRoute);
app.use("/api/v1", foodPackageRouter);
app.use("/api/v1", authRoutes);
app.use("/api/v1", profileRoutes);

app.listen(PORT, () => {
  console.log(`The app is running at ${PORT}`);
});
