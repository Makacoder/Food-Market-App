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

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set view engine
app.set("view engine", "ejs");

// Custom Modules

// Database connection

// MAIN ENTRY POINT
app.get("/", (req, res) => {
  res.json({ message: "This is the main application entry point" });
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

// set up routes
// app.use('/api/v1/', userRoute)

const { PORT } = process.env;
const mysqldb = require("./database/mysqldb");
const postgresdb = require("./database/postgresdb");
mysqldb;
postgresdb;
connectDB;

app.use("/api/v1", userRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", foodStuffRoute);
app.use("/api/v1", authRoutes);
app.use("/api/v1", profileRoutes);

app.listen(PORT, () => {
  console.log(`The app is running at ${PORT}`);
});
