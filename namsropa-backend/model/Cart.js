const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dress", 
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
    type: String,
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
   user: {  // 👈 changed from userId
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one cart per user
  },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
