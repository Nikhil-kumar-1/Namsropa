const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dress', // Ya jo bhi aapka product model hai
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [wishlistItemSchema]
}, {
  timestamps: true
});

// Index for faster queries
wishlistSchema.index({ user: 1 });

// Pre-save middleware to ensure unique products
wishlistSchema.pre('save', function(next) {
  const productIds = new Set();
  this.items = this.items.filter(item => {
    if (productIds.has(item.product.toString())) {
      return false; // Remove duplicate
    }
    productIds.add(item.product.toString());
    return true;
  });
  next();
});

module.exports = mongoose.model('Wishlist', wishlistSchema);