const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
router.post("/add", cartController.addToCart);
router.get("/getCart", cartController.getCart)

module.exports = router;