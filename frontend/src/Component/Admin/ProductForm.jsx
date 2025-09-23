import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2, FiImage, FiCheckCircle } from "react-icons/fi";
import { backendUrl } from "../../config/config";

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    title: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "Tops",
    sizes: "",
    colors: "",
    inStock: true,
    stockQuantity: "",
    featured: false,
    trending: false,
    discount: "",
    tags: ""
  });

  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const categories = [
    { value: "Dresses", label: "dresses" },
        { value: "Tops", label: "tops" },
        { value: "Bottoms", label: "bottoms" },
        { value: "Jumpsuits", label: "jumpsuits" },
        { value: "Coats", label: "coats" },
        { value: "Bridesmaid", label: "bridesmaid" }

  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(previews => {
      setPreviewImages(previews);
    });
  };

 const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dresses_unsigned");
    formData.append("folder", "dresses");

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/djtzwg9lz/image/upload`,
      formData
    );
    return { url: res.data.secure_url, publicId: res.data.public_id };
  } catch (error) {
    console.error("Cloudinary upload error:", error.response?.data || error.message);
    throw new Error("Failed to upload image to Cloudinary");
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage({ text: "", type: "" });

  try {
    if (!image) throw new Error("Main image is required!");

    // Upload main image
    const mainImage = await uploadToCloudinary(image);

    // Upload additional images
    const additionalImages = [];
    for (const file of images) {
      const uploaded = await uploadToCloudinary(file);
      additionalImages.push(uploaded);
    }

    // Prepare payload
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice
        ? parseFloat(formData.originalPrice)
        : parseFloat(formData.price),
      stockQuantity: formData.stockQuantity
        ? parseInt(formData.stockQuantity)
        : 0,
      discount: formData.discount ? parseFloat(formData.discount) : 0,
      sizes: formData.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: formData.colors.split(",").map((c) => c.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: { url: mainImage.url, publicId: mainImage.publicId },
      images: [
        { url: mainImage.url, publicId: mainImage.publicId },
        ...additionalImages.map((img) => ({
          url: img.url,
          publicId: img.publicId,
        })),
      ],
    };

    console.log("Payload to be sent:", payload);

    // ✅ Yaha backend ko call karo
    const res = await axios.post(`${backendUrl}/api/dresses`, payload);

    setMessage({ text: "✅ Product uploaded successfully!", type: "success" });

    // Reset form
    setFormData({
      brand: "",
      title: "",
      price: "",
      originalPrice: "",
      description: "",
      category: "casual",
      sizes: "",
      colors: "",
      inStock: true,
      stockQuantity: "",
      featured: false,
      trending: false,
      discount: "",
      tags: "",
    });
    setImage(null);
    setImages([]);
    setPreviewImage(null);
    setPreviewImages([]);
  } catch (err) {
    console.error("Upload error:", err);
    setMessage({
      text: `❌ Failed to upload product: ${
        err.response?.data?.message || err.message
      }`,
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};


  const removePreviewImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const removePreviewImages = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <motion.div 
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">Upload New Product</h2>
          <p className="text-blue-100">Add a new dress to your collection</p>
        </div>

        <div className="p-6">
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 mb-6 rounded-lg ${
                  message.type === "success" 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  placeholder="e.g., WAYWARD FANCIES"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  placeholder="e.g., Floral Print Maxi Dress"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                  placeholder="99.95"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="129.95"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sizes (comma separated)</label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="S, M, L, XL"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Colors (comma separated)</label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Red, Blue, Black"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="15"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="summer, floral, casual"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows="4"
                placeholder="Describe the product in detail..."
              ></textarea>
            </div>

            {/* Image Upload Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Image *</label>
                <div className="flex flex-col space-y-3">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden" 
                      required
                    />
                  </label>
                  {previewImage && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative mt-2"
                    >
                      <img 
                        src={previewImage} 
                        alt="Preview" 
                        className="h-40 w-full object-cover rounded-lg border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={removePreviewImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
                <div className="flex flex-col space-y-3">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">Click to upload multiple images</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      onChange={handleImagesChange}
                      className="hidden" 
                    />
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {previewImages.map((preview, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                      >
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`} 
                          className="h-24 w-full object-cover rounded border shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removePreviewImages(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">In Stock</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">Featured Product</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="trending"
                  checked={formData.trending}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700 font-medium">Trending</span>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading Product...
                </div>
              ) : (
                "Upload Product"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductUploadForm;