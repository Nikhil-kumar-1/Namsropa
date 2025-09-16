const mongoose = require('mongoose');

const dressSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number,
    required: true
  },
  images: [
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }
  }
],
image: {
  url: { type: String },
  publicId: { type: String }
},

  description: {
    type: String,
    default: ''
  },
  
  category: {
    type: String,
    enum: ['tops', 'bottoms', 'jumpsuits', 'coats', 'bridesmaid', 'winter'],
    default: 'casual'
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  colors: [{
    type: String
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String
  }],
  rating: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Virtual for display price with discount
dressSchema.virtual('salePrice').get(function() {
  return this.price - (this.price * (this.discount / 100));
});

// Transform output to include virtuals
dressSchema.set('toJSON', { virtuals: true });
dressSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Dress', dressSchema);