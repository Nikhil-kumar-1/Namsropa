import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../cartSlice";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSizeType, setSelectedSizeType] = useState("standard");
  const [selectedColor, setSelectedColor] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [openSection, setOpenSection] = useState(null);
  
  // Custom measurements state
  const [customMeasurements, setCustomMeasurements] = useState({
    shoulder: "",
    chest: "",
    bust: "",
    underBust: "",
    waist: "",
    hip: "",
    upperArm: "",
    hpsToBust: "",
    hpsToWaist: "",
    hpsToKnee: ""
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (selectedSizeType === "standard" && !selectedSize && product.sizes?.length > 0) {
      return alert("Select size");
    }
    if (selectedSizeType === "custom" && Object.values(customMeasurements).some(m => m === "")) {
      return alert("Please fill all custom measurements");
    }
    if (!selectedColor && product.colors?.length > 0) return alert("Select color");

    dispatch(
      addToCart({
        product,
        quantity,
        size: selectedSizeType === "standard" ? selectedSize : "Custom",
        customMeasurements: selectedSizeType === "custom" ? customMeasurements : null,
        sizeType: selectedSizeType,
        color: selectedColor,
      })
    );

    alert("Added to cart!");
  };

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If no product data, redirect back
  if (!product) {
    navigate("/products");
    return null;
  }

  // Size chart data
  const sizeChart = {
    measurements: ["Bust (inches)", "Waist (inches)", "Hips (inches)"],
    sizes: {
      XS: [32, 24, 34],
      S: [34, 26, 36],
      M: [36, 28, 38],
      L: [38, 30, 40],
      XL: [40, 32, 42],
      XXL: [42, 34, 44],
      "0": [32, 24, 34],
      "2": [33, 25, 35],
      "4": [34, 26, 36],
      "6": [35, 27, 37],
      "8": [36, 28, 38],
      "10": [37, 29, 39],
      "12": [38, 30, 40],
      "14": [39, 31, 41],
      "16": [40, 32, 42],
      "18": [41, 33, 43],
      "16w": [42, 34, 44],
      "18w": [43, 35, 45],
      "20w": [44, 36, 46],
      "22w": [45, 37, 47],
      "24w": [46, 38, 48],
      "26w": [47, 39, 49],
      "28w": [48, 40, 50],
      "30w": [49, 41, 51],
      "32w": [50, 42, 52],
      "34w": [51, 43, 53],
      "36w": [52, 44, 54],
    },
  };

  // Calculate discounted price
  const discountedPrice =
    product.price - product.price * (product.discount / 100);

  // Generate measurement options
  const generateMeasurementOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={`${i}"`}>
          {i}"
        </option>
      );
    }
    return options;
  };

  // Handle custom measurement change
  const handleMeasurementChange = (measurement, value) => {
    setCustomMeasurements({
      ...customMeasurements,
      [measurement]: value
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Parallax Header Section */}
      <div
        className="relative h-96 overflow-hidden"
        style={{
          backgroundImage: `url('${
            product.images?.[0]?.url ||
            product.image?.url ||
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
          }')`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

        {/* Navigation Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate(-1)}
          className="absolute top-30 left-6 z-10 bg-yellow-500/10 backdrop-blur-md text-yellow-400 hover:text-yellow-300 rounded-full p-2 border border-yellow-500/30 hover:border-yellow-400/50 transition-all"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative -mt-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-br from-white-600 to-red rounded-xl shadow-6xl border border-yellow-800 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Left Column - Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-xl bg-gray-800 aspect-square border border-yellow-800/20 shadow-lg">
                <motion.img
                  key={selectedImage}
                  src={
                    product.images?.[selectedImage]?.url ||
                    product.image?.url ||
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
                  }
                  alt={product.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="absolute top-4 left-4 bg-yellow-500 text-black font-bold text-sm px-3 py-1 rounded-full shadow-lg"
                  >
                    {product.discount}% OFF
                  </motion.div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {product.images &&
                  product.images.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-lg overflow-hidden aspect-square border-2 ${
                        selectedImage === index
                          ? "border-yellow-500 ring-2 ring-yellow-500/30"
                          : "border-gray-700 opacity-70 hover:opacity-100"
                      } transition-all duration-300`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="py-4 font-serif">
              {/* Breadcrumb */}
              <nav className="flex mb-6 text-yellow-500/80 text-sm">
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Home
                </button>
                <span className="mx-2">/</span>
                <button
                  onClick={() => navigate("/products")}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Dresses
                </button>
                <span className="mx-2">/</span>
                <span className="text-yellow-400 capitalize">
                  {product.category}
                </span>
              </nav>

              {/* Brand and Title */}
              <div className="mb-6">
                <h2 className="text-sm uppercase tracking-widest text-yellow-500 font-medium">
                  {product.brand}
                </h2>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mt-2">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center mt-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.floor(product.rating?.average || 0)
                            ? "text-yellow-400"
                            : "text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-white">
                    {product.rating?.average || 0} ({product.rating?.count || 0}{" "}
                    reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 bg-black/50 rounded-lg border border-yellow-800">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-yellow-400">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="ml-4 text-lg text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="ml-4 bg-yellow-900 text-yellow-400 text-sm font-semibold px-3 py-1 rounded border border-yellow-700/30">
                        Save {product.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3
                  className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection("description")}
                >
                  Description
                  <span>{openSection === "description" ? "−" : "+"}</span>
                </h3>
                {openSection === "description" && (
                  <p className="text-gray-300 leading-relaxed">
                    {product.description || "No description available."}
                  </p>
                )}
              </div>

              {/* Delivery & Returns */}
              <div className="mb-6">
                <h3
                  className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection("delivery")}
                >
                  Delivery & Returns
                  <span>{openSection === "delivery" ? "−" : "+"}</span>
                </h3>
                {openSection === "delivery" && (
                  <p className="text-gray-300 leading-relaxed">
                    We offer complimentary express shipping.
                    <br />
                    <br />
                    Free returns are available worldwide. If your item is eligible for
                    return, you have 30 days from the date you receive your order to
                    follow this procedure.
                    <br />
                    <br />
                    See delivery and returns for more information.
                  </p>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2">
                    Color
                  </h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-full border-2 shadow-lg ${
                          selectedColor === color
                            ? "ring-2 ring-yellow-500 ring-offset-2 ring-offset-black"
                            : "border-gray-700"
                        }`}
                        style={{
                          backgroundColor: color.toLowerCase().includes("black")
                            ? "#000"
                            : color.toLowerCase().includes("blue")
                            ? "#1e40af"
                            : color.toLowerCase().includes("burgundy")
                            ? "#800020"
                            : color.toLowerCase().includes("red")
                            ? "#dc2626"
                            : color.toLowerCase().includes("white")
                            ? "#fff"
                            : color.toLowerCase().includes("green")
                            ? "#059669"
                            : "#d1d5db",
                        }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2">
                  Select Size
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-3 px-4 rounded-lg border text-center ${
                      selectedSizeType === "standard"
                        ? "bg-yellow-500 text-black border-yellow-500 font-bold"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500/50"
                    } transition-all duration-200`}
                    onClick={() => setSelectedSizeType("standard")}
                  >
                    Standard Size
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`py-3 px-4 rounded-lg border text-center ${
                      selectedSizeType === "custom"
                        ? "bg-yellow-500 text-black border-yellow-500 font-bold"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500/50"
                    } transition-all duration-200`}
                    onClick={() => setSelectedSizeType("custom")}
                  >
                    Custom Size
                  </motion.button>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  Size charts vary across brands, check eShakti's size chart.
                </p>

                {/* Standard Size Selection */}
                {/* Standard Size Selection */}
{selectedSizeType === "standard" && (
  <>
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-md font-semibold text-yellow-400">
        Select Standard Size
      </h3>
      <button
        className="flex items-center text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
        onClick={() => setShowSizeChart(!showSizeChart)}
      >
        Size Guide
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>

    {/* Sizes Grid */}
    <div className="grid grid-cols-5 gap-4">
      {[
        { label: "XS", sizes: ["0", "2"] },
        { label: "S", sizes: ["4", "6"] },
        { label: "M", sizes: ["8", "10"] },
        { label: "L", sizes: ["12", "14"] },
        { label: "XL", sizes: ["16", "18"] },
        { label: "1X", sizes: ["16w", "18w"] },
        { label: "2X", sizes: ["20w", "22w"] },
        { label: "3X", sizes: ["24w", "26w"] },
        { label: "4X", sizes: ["28w", "30w"] },
        { label: "5X", sizes: ["32w", "34w"] },
        { label: "6X", sizes: ["36w"] },
      ].map((group) => (
       <div key={group.label} className="flex flex-col items-center gap-1">
  {/* Label on top */}
  <span className="text-yellow-400 text-lg font-medium">{group.label}</span>

  {/* Sizes in a row */}
  <div className="flex gap-2">
    {group.sizes.map((size) => (
      <motion.button
        key={size}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`py-1 px-3 text-xs rounded border min-w-[2.5rem] text-center transition-all duration-200 ${
          selectedSize === size
            ? "bg-yellow-500 text-black border-yellow-500 font-bold"
            : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500/50"
        }`}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </motion.button>
    ))}
  </div>
</div>

      ))}
    </div>
  </>
)}
     {/* Custom Size Selection */}
                {selectedSizeType === "custom" && (
                  <div className="space-y-4">
                    <p className="text-yellow-400 text-sm">
                      Please provide your measurements for a custom fit:
                    </p>
                    
                    {/* Required Measurements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Shoulder</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.shoulder}
                          onChange={(e) => handleMeasurementChange("shoulder", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(11, 25)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Chest</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.chest}
                          onChange={(e) => handleMeasurementChange("chest", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(20, 100)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Bust</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.bust}
                          onChange={(e) => handleMeasurementChange("bust", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(20, 100)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Under Bust</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.underBust}
                          onChange={(e) => handleMeasurementChange("underBust", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(20, 100)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Waist</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.waist}
                          onChange={(e) => handleMeasurementChange("waist", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(20, 100)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Hip</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.hip}
                          onChange={(e) => handleMeasurementChange("hip", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(20, 100)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-yellow-400 mb-1">Upper Arm</label>
                        <select 
                          className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                          value={customMeasurements.upperArm}
                          onChange={(e) => handleMeasurementChange("upperArm", e.target.value)}
                        >
                          <option value="">select</option>
                          {generateMeasurementOptions(9, 100)}
                        </select>
                      </div>
                    </div>
                    
                    {/* Optional Measurements */}
                    <div className="mt-6">
                      <h4 className="text-md font-semibold text-yellow-400 mb-3">
                        Optional Measurements
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        The measurements below are optional. If you have a long torso or long legs, 
                        please consider providing them to help us achieve a great fit. For best results, 
                        please ask someone to help measure you.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-yellow-400 mb-1">HPS to Bust Point</label>
                          <select 
                            className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                            value={customMeasurements.hpsToBust}
                            onChange={(e) => handleMeasurementChange("hpsToBust", e.target.value)}
                          >
                            <option value="">select</option>
                            {generateMeasurementOptions(5, 100)}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-yellow-400 mb-1">HPS to Waist</label>
                          <select 
                            className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                            value={customMeasurements.hpsToWaist}
                            onChange={(e) => handleMeasurementChange("hpsToWaist", e.target.value)}
                          >
                            <option value="">select</option>
                            {generateMeasurementOptions(5, 100)}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-yellow-400 mb-1">HPS to Knee</label>
                          <select 
                            className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                            value={customMeasurements.hpsToKnee}
                            onChange={(e) => handleMeasurementChange("hpsToKnee", e.target.value)}
                          >
                            <option value="">select</option>
                            {generateMeasurementOptions(5, 100)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Size Chart Modal */}
              {showSizeChart && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-900 rounded-xl max-w-6xl h-100 w-full p-6 border border-yellow-800 max-h-screen overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-4 border-b border-yellow-800 pb-3">
                      <h3 className="text-xl font-bold text-yellow-400">
                        Size Guide
                      </h3>
                      <button
                        onClick={() => setShowSizeChart(false)}
                        className="text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
                        <thead>
                          <tr className="bg-yellow-900/30">
                            <th className="py-3 px-4 text-left text-yellow-400 font-semibold">
                              Size
                            </th>
                            {sizeChart.measurements.map((measure, idx) => (
                              <th
                                key={idx}
                                className="py-3 px-4 text-center text-yellow-400 font-semibold"
                              >
                                {measure}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(sizeChart.sizes).map(
                            ([size, measurements]) => (
                              <tr
                                key={size}
                                className="border-b border-yellow-800/20 even:bg-gray-800/50"
                              >
                                <td className="py-3 px-4 text-center font-medium text-white">
                                  {size}
                                </td>
                                {measurements.map((value, idx) => (
                                  <td
                                    key={idx}
                                    className="py-3 px-4 text-center text-gray-300"
                                  >
                                    {value}"
                                  </td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-6 text-sm text-gray-400">
                      <p className="text-yellow-400 mb-2">
                        How to measure:
                      </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Bust:</strong> Measure around the fullest
                          part of your bust
                        </li>
                        <li>
                          <strong>Waist:</strong> Measure around the
                          narrowest part of your waist
                        </li>
                        <li>
                          <strong>Hips:</strong> Measure around the fullest
                          part of your hips
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-yellow-800 rounded-lg bg-black/50">
                    <button
                      className="px-3 cursor-pointer py-2 text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-white">{quantity}</span>
                    <button
                      className="cursor-pointer px-3 py-2 text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex-1 ">
                   <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full cursor-pointer bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-lg"
      disabled={
        (selectedSizeType === "standard" && !selectedSize && product.sizes?.length > 0) ||
        (selectedSizeType === "custom" && Object.values(customMeasurements).some(m => m === "")) ||
        (!selectedColor && product.colors?.length > 0)
      }
      onClick={handleAddToCart}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        ></path>
      </svg>
      Add to Cart
    </motion.button>
                  </div>
                </div>
              </div>

              {/* Product Meta */}
              <div className="border-t border-yellow-800 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-yellow-500/80">Category:</span>
                    <span className="ml-2 font-medium text-white capitalize">
                      {product.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-yellow-500/80">SKU:</span>
                    <span className="ml-2 font-medium text-white">
                      DRS-{product._id}
                    </span>
                  </div>
                  <div>
                    <span className="text-yellow-500/80">Availability:</span>
                    <span
                      className={`ml-2 font-medium ${
                        product.inStock ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {product.inStock
                        ? `In Stock (${product.stockQuantity})`
                        : "Out of Stock"}
                    </span>
                  </div>
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <span className="text-yellow-500/80">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-yellow-900/30 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;