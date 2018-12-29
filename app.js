const express = require("express");
const expressLayout = require("express-ejs-layouts");
const mongoos = require("mongoose");

const app = express();
// EJS
app.use(expressLayout);
app.set("view engine", "ejs");

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
