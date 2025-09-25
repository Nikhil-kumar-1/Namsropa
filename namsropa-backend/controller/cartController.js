const jwt = require("jsonwebtoken");
const Cart = require("../model/Cart.js");
const Product = require("../model/Product.js");

exports.addToCart = async (req, res) => {
  try {
    // 🔹 Extract token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // 🔹 Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // make sure you signed token as { id: user._id }

    const {
      productId,
      quantity = 1,
      sizeType = "standard",
      size,
      customMeasurements,
      color,
    } = req.body;

    // 🔹 Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // 🔹 Find cart by user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: userId, // 👈 fixed: use `user`
        items: [{ productId, quantity, sizeType, size, customMeasurements, color }],
      });
    } else {
      // Check if product with same variant exists
      const existingItem = cart.items.find(
        (item) =>
          item.productId.toString() === productId &&
          item.sizeType === sizeType &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, sizeType, size, customMeasurements, color });
      }
    }

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
