const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  sizeType: {
    type: String,
    enum: ["standard", "custom"],
    default: "standard",
  },
  size: {
    type: String, // e.g. XS, S, M, L, XL or "Custom"
  },
  customMeasurements: {
    shoulder: String,
    chest: String,
    bust: String,
    underBust: String,
    waist: String,
    hip: String,
    upperArm: String,
    hpsToBust: String,
    hpsToWaist: String,
    hpsToKnee: String,
  },
  color: String,
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
