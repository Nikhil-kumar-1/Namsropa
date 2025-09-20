const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");

// ✅ Add to cart
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, quantity = 1, sizeType, size, customMeasurements, color } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if not exist
      cart = new Cart({
        userId,
        items: [{ productId, quantity: Number(quantity), sizeType, size, customMeasurements, color }],
      });
    } else {
      // Check if same product with same size & color already exists
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (itemIndex > -1) {
        // If product exists, update quantity
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        // Else add new product
        cart.items.push({ productId, quantity: Number(quantity), sizeType, size, customMeasurements, color });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Add to Cart Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get user cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    console.error("Get Cart Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Remove item from cart (with size & color check)
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { size, color } = req.query; // frontend se size & color bhejna hoga query me

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          (size ? item.size === size : true) &&
          (color ? item.color === color : true)
        )
    );

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Remove Cart Item Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
