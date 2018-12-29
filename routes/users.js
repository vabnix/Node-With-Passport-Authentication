const express = require("express");
const router = express.Router();

//User login page
router.get("/login", (req, res) => res.render("login"));

//User Registration Page
router.get("/register", (req, res) => res.render("register"));

module.exports = router;
