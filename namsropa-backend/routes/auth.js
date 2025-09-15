const express = require("express");
const { signup_post, login_post, logout_get } = require("../controller/authController");

const router = express.Router();

router.post("/signup", signup_post); // register route
router.post("/login", login_post);   // login route
router.get("/logout", logout_get);   // logout route

module.exports = router;
