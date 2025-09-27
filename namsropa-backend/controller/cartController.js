const jwt = require("jsonwebtoken");
const Cart = require("../model/Cart");
const Dress = require("../model/Product"); // <-- this points to Product.js
const mongoose = require("mongoose");


// ✅ Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { productId, quantity = 1, sizeType = "standard", size, customMeasurements, color } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID required" });

    // Validate product exists
    const product = await Dress.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Find existing cart
    let cart = await Cart.findOne({ user: userId });

    // New cart item
    const cartItem = { productId, quantity, sizeType, size, customMeasurements, color };

    if (!cart) {
      // No cart exists, create new
      cart = new Cart({ user: userId, items: [cartItem] });
    } else {
      // Remove invalid items (missing productId)
      cart.items = cart.items.filter(
        (item) => item.productId && mongoose.Types.ObjectId.isValid(item.productId)
      );

      // Check if same item exists
      const existingIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.sizeType === sizeType &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        // Update quantity if item exists
        cart.items[existingIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push(cartItem);
      }
    }

    await cart.save();
    return res.status(200).json({ success: true, message: "Item added to cart", cart });

  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get user cart
exports.getCart = async (req, res) => {

  try {
    console.log("🔹 getCart called");

    // Extract token
    const token = req.headers.authorization?.split(" ")[1];
    console.log("🔹 Token from headers:", token);

    if (!token) {
      console.warn("⚠️ No token provided");
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔹 Decoded token:", decoded);

    const userId = decoded.id;
    if (!userId) {
      console.warn("⚠️ User ID missing in token");
      return res.status(401).json({ success: false, message: "User ID missing" });
    }
    console.log("🔹 User ID:", userId);

    // Find cart
    const cart = await Cart.findOne({ user: userId })
      .populate("items.productId", "brand title price images");
    console.log("🔹 Cart fetched from DB:", cart);

    if (!cart) {
      console.log("ℹ️ Cart is empty");
      return res.status(200).json({ 
        success: true, 
        message: "Cart is empty", 
        cart: { items: [] } 
      });
    }

    // Log items individually
    cart.items.forEach((item, index) => {
      console.log(`🔸 Item ${index + 1}:`, {
        productId: item.productId?._id,
        brand: item.productId?.brand,
        title: item.productId?.title,
        price: item.productId?.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    });

    // Return cart
    return res.status(200).json({ success: true, cart });

  } catch (error) {
    console.error("❌ Get Cart Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};


// ✅ Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) return res.status(400).json({ success: false, message: "Valid quantity required" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ success: false, message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart item updated", cart });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    return res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = [];
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
