import mongoose from 'mongoose';

const imageOptionSchema = new mongoose.Schema({
  value: { type: String, required: true },    // e.g. "Short Sleeve"
  imageUrls: [{ type: String, required: true }], // Array of image URLs for this option
  additionalPrice: { type: Number, default: 0 }
});

const imageGroupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Sleeve Type"
  options: [imageOptionSchema],
  required: { type: Boolean, default: false }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  basePrice: { type: Number, required: true },
  imageGroups: [imageGroupSchema], // Puzzle pieces or image groups
  categories: [{ type: String }],
  tags: [{ type: String }],
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
