const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
router.post("/add", cartController.addToCart);
router.get("/getCart", cartController.getCart)
// routes/cartRoutes.js
router.delete("/remove/:id", cartController.removeFromCart);


module.exports = router;