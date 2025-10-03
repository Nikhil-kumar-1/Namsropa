import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAsync } from "../../cartSlice"; // Adjust path according to your project

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product } = location.state || {};
  const cartLoading = useSelector((state) => state.cart?.loading || false);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedSizeType, setSelectedSizeType] = useState("standard");
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
    hpsToKnee: "",
  });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Updated Add to cart function with Redux
  const handleAddToCart = async () => {
    if (!product) return;

    // Validation checks
    if (selectedSizeType === "standard" && !selectedSize) {
      alert("Please select a size");
      return;
    }

    if (selectedSizeType === "custom" && Object.values(customMeasurements).some(m => m === "")) {
      alert("Please fill all custom measurements");
      return;
    }

    const cartData = {
      productId: product._id,
      quantity,
      sizeType: selectedSizeType,
      size: selectedSizeType === "standard" ? selectedSize : null,
      customMeasurements: selectedSizeType === "custom" ? customMeasurements : {},
      product: product // Include full product for immediate UI update
    };

    try {
      const result = await dispatch(addToCartAsync(cartData)).unwrap();
      
      if (result.success) {
        alert("✅ Item added to cart successfully!");
      }
    } catch (error) {
      if (error.includes("Please login") || error.includes("Session expired")) {
        alert("Please login to add items to cart");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(`❌ Error: ${error}`);
      }
    }
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
    headers: {
      XS: ["0", "2"],
      S: ["4", "6"],
      M: ["8", "10"],
      L: ["12", "14"],
      XL: ["16", "18"],
      "1X": ["16W", "18W"],
      "2X": ["20W", "22W"],
      "3X": ["24W", "26W"],
      "4X": ["28W", "30W"],
      "5X": ["32W", "34W"],
      "6X": ["36W"],
    },
    Bust: [
      32, 33, 34, 35, 36, 37, 38.5, 40, 41.5, 43.5, 43, 45, 47, 49, 51, 53, 55,
      57, 60, 63, 66,
    ],
    Waist: [
      25, 26, 27, 28, 29, 30, 31.5, 33, 34.5, 36.5, 36, 38, 40, 42, 44, 46, 48,
      50, 53, 56, 59,
    ],
    Hip: [
      35, 36, 37, 38, 39, 40, 41.5, 43, 44.5, 46.5, 46, 48, 50, 52, 54, 56, 58,
      60, 63, 66, 69,
    ],
  };

  // Calculate discounted price
  const discountedPrice =
    product.price - product.price * (product.discount / 100);

  // Generate measurement options
  const generateMeasurementOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={`${i}`}>
          {i}
        </option>
      );
    }
    return options;
  };

  // Handle custom measurement change
  const handleMeasurementChange = (measurement, value) => {
    setCustomMeasurements({
      ...customMeasurements,
      [measurement]: value,
    });
  };

  // Get main image URL
  const getMainImage = () => {
    if (product.images?.[selectedImage]?.url)
      return product.images[selectedImage].url;
    if (product.image?.url) return product.image.url;
    if (product.images?.[0]?.url) return product.images[0].url;
    return "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1";
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Parallax Header Section */}
      <div
        className="relative h-96 overflow-hidden"
        style={{
          backgroundImage: `url(${getMainImage()})`,
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
             
                <motion.img
                  key={selectedImage}
                  src={getMainImage()}
                  alt={product.title || product.name}
                  className="w-full h-200 object-contain"
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
              

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
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
                        className="w-full h-full object-fit"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
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
                  {product.brand || "Premium Brand"}
                </h2>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mt-2">
                  {product.title || product.name}
                </h1>

                {/* Rating */}
               
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


              <div className="mb-6">
                <h3
                  className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection("delivery")}
                >
                  Delivery and Returns
                  <span>{openSection === "delivery" ? "−" : "+"}</span>
                </h3>
                {openSection === "delivery" && (
                 <p className="text-gray-300 leading-relaxed">
  We offer complimentary express shipping.<br /><br />
  Free returns are available worldwide. If your item is eligible for return, you have 30 days from the date you receive your order to follow this procedure.<br /><br />
  See delivery and returns for more information.
</p>

                )}
              </div>


              {/* Size Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3 border-b border-yellow-800 pb-2">
                  Select Size Type
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

                {/* Standard Size Selection */}
                {selectedSizeType === "standard" && (
                  <>
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
                        <div
                          key={group.label}
                          className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gray-900/40"
                        >
                          <span className="text-yellow-400 text-sm sm:text-base font-medium">
                            {group.label}
                          </span>
                          <div className="flex gap-1 justify-center">
                            {group.sizes.map((size) => (
                              <motion.button
                                key={size}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`py-1 px-3 text-xs sm:text-sm rounded border min-w-[2.1rem] text-center transition-all duration-200 ${
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        {
                          key: "shoulder",
                          label: "Shoulder",
                          start: 11,
                          end: 25,
                        },
                        { key: "chest", label: "Chest", start: 20, end: 100 },
                        { key: "bust", label: "Bust", start: 20, end: 100 },
                        {
                          key: "underBust",
                          label: "Under Bust",
                          start: 20,
                          end: 100,
                        },
                        { key: "waist", label: "Waist", start: 20, end: 100 },
                        { key: "hip", label: "Hip", start: 20, end: 100 },
                        {
                          key: "upperArm",
                          label: "Upper Arm",
                          start: 9,
                          end: 100,
                        },
                      ].map(({ key, label, start, end }) => (
                        <div key={key}>
                          <label className="block text-sm text-yellow-400 mb-1">
                            {label}
                          </label>
                          <select
                            className="w-full bg-gray-800 border border-yellow-800 rounded-lg px-3 py-2 text-white"
                            value={customMeasurements[key]}
                            onChange={(e) =>
                              handleMeasurementChange(key, e.target.value)
                            }
                          >
                            <option value="">Select measurement</option>
                            {generateMeasurementOptions(start, end)}
                          </select>
                        </div>
                      ))}
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
                    className="bg-gray-900 rounded-xl max-w-7xl w-full p-6 border border-yellow-800 max-h-screen overflow-auto"
                  >
                    {/* Header */}
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
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-yellow-800 text-gray-300 text-sm">
                        <thead>
                          {/* First Row: XS, S, ... */}
                          <tr className="bg-yellow-900/30 text-yellow-400 text-center">
                            <th
                              rowSpan="2"
                              className="py-3 px-4 border border-yellow-800 text-left font-semibold"
                            >
                              Size
                            </th>
                            {Object.entries(sizeChart.headers).map(
                              ([label, subs]) => (
                                <th
                                  key={label}
                                  colSpan={subs.length}
                                  className="py-3 px-4 border border-yellow-800 font-semibold"
                                >
                                  {label}
                                </th>
                              )
                            )}
                          </tr>
                          {/* Second Row: 0,2,4,6... */}
                          <tr className="bg-yellow-900/20 text-yellow-300 text-center">
                            {Object.values(sizeChart.headers)
                              .flat()
                              .map((num, i) => (
                                <th
                                  key={i}
                                  className="py-2 px-4 border border-yellow-800 font-medium"
                                >
                                  {num}
                                </th>
                              ))}
                          </tr>
                        </thead>

                        <tbody>
                          {/* Bust Row */}
                          <tr className="even:bg-gray-800/50 text-center">
                            <td className="py-3 px-4 font-semibold text-yellow-400 border border-yellow-800 text-left">
                              Bust
                            </td>
                            {sizeChart.Bust.map((val, i) => (
                              <td
                                key={i}
                                className="py-3 px-4 border border-yellow-800"
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                          {/* Waist Row */}
                          <tr className="even:bg-gray-800/50 text-center">
                            <td className="py-3 px-4 font-semibold text-yellow-400 border border-yellow-800 text-left">
                              Natural Waist
                            </td>
                            {sizeChart.Waist.map((val, i) => (
                              <td
                                key={i}
                                className="py-3 px-4 border border-yellow-800"
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                          {/* Hip Row */}
                          <tr className="even:bg-gray-800/50 text-center">
                            <td className="py-3 px-4 font-semibold text-yellow-400 border border-yellow-800 text-left">
                              Hip
                            </td>
                            {sizeChart.Hip.map((val, i) => (
                              <td
                                key={i}
                                className="py-3 px-4 border border-yellow-800"
                              >
                                {val}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
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
                      className="px-3 py-2 text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-white">{quantity}</span>
                    <button
                      className="px-3 py-2 text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        cartLoading ||
                        (selectedSizeType === "standard" && !selectedSize) ||
                        (selectedSizeType === "custom" && Object.values(customMeasurements).some(m => m === ""))
                      }
                      onClick={handleAddToCart}
                    >
                      {cartLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Adding...
                        </>
                      ) : (
                        <>
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
                            />
                          </svg>
                          Add to Cart
                        </>
                      )}
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
                      DRS-{product._id?.slice(-8)}
                    </span>
                  </div>
                  
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