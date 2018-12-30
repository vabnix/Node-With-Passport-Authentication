const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoos = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

// Passport Configuration
require("./config/passport")(passport);

//Connecting to Database
const db = require("./config/db").MongoURL;
mongoos
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EJS
app.use(expressLayout);
app.set("view engine", "ejs");

//Bodyparser
app.use(express.urlencoded({ extended: true }));

// Session information
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
