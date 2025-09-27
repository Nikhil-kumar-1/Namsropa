import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateQuantity, clearCart, selectCartItems, selectCartLoading } from "../../cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get cart data from Redux store
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector(selectCartLoading);
  
  const [error, setError] = useState(null);
  const [removingItem, setRemovingItem] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [updatingQuantity, setUpdatingQuantity] = useState(null);

  // Fetch cart data from backend and sync with Redux
  const fetchCartData = async () => {
    try {
      setError(null);
      // This will fetch from backend and update Redux store
      await dispatch(fetchCart()).unwrap();
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart items");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [dispatch]);

  // Update quantity in backend and Redux
  const handleUpdateQuantity = async (productId, size, color, customMeasurements, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const itemKey = `${productId}-${size}-${color}-${JSON.stringify(customMeasurements)}`;
      setUpdatingQuantity(itemKey);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to update cart");
      }

      const response = await fetch("http://localhost:5000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          size,
          color,
          customMeasurements,
          quantity: newQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      // Update Redux store
      dispatch(updateQuantity({
        productId,
        size,
        color,
        customMeasurements,
        quantity: newQuantity
      }));

    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setUpdatingQuantity(null);
    }
  };

  // Remove item from backend and Redux
  const handleRemoveItem = async (productId, size, color, customMeasurements) => {
    try {
      const itemKey = `${productId}-${size}-${color}-${JSON.stringify(customMeasurements)}`;
      setRemovingItem(itemKey);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to remove items");
      }

      const response = await fetch("http://localhost:5000/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          size,
          color,
          customMeasurements,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      // Remove from Redux store
      dispatch(removeFromCart({
        productId,
        size,
        color,
        customMeasurements
      }));

    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item. Please try again.");
      setRemovingItem(null);
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to clear cart");
      }

      const response = await fetch("http://localhost:5000/api/cart/clear", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      // Clear Redux store
      dispatch(clearCart());

    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart. Please try again.");
    }
  };

  // Calculate totals
  const getSubtotal = () =>
    cartItems.reduce((total, item) => {
      const price = item.product?.discount > 0 
        ? item.product.price - (item.product.price * item.product.discount / 100)
        : item.product?.price || 0;
      return total + price * item.quantity;
    }, 0);

  const getOriginalSubtotal = () =>
    cartItems.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);

  const shippingThreshold = 500;
  const shippingCost = getSubtotal() >= shippingThreshold ? 0 : 50;
  const totalAmount = getSubtotal() + shippingCost;
  const totalSavings = getOriginalSubtotal() - getSubtotal();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    },
    exit: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const toggleExpandItem = (itemKey) => {
    setExpandedItem(expandedItem === itemKey ? null : itemKey);
  };

  // Helper function to get product image
  const getProductImage = (product) => {
    return product?.images?.[0]?.url || product?.image?.url || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1";
  };

  // Helper function to get product title
  const getProductTitle = (product) => {
    return product?.title || product?.name || "Unknown Product";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
            <FiShoppingBag className="text-2xl text-yellow-500 animate-pulse" />
          </div>
          <p className="text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-16 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 mb-4">
            <FiShoppingBag className="text-2xl text-red-500" />
          </div>
          <p className="text-lg text-red-400 mb-4">Error loading cart</p>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchCartData}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6 sticky top-16 bg-gray-900 py-3 z-10"
        >
          <button
            onClick={() => navigate("/products")}
            className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group p-2"
          >
            <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            <span className="ml-2 text-sm">Continue Shopping</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center text-red-500 hover:text-red-400 transition-colors p-2 text-sm"
              aria-label="Clear cart"
            >
              <FiTrash2 className="text-lg mr-1" />
              Clear All
            </button>
          )}
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-4"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-800 mb-6">
              <FiShoppingBag className="text-4xl text-yellow-500" />
            </div>
            <p className="text-2xl font-semibold mb-4">Your cart is empty</p>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to find amazing dresses!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all"
            >
              Explore Dresses
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => {
                  const itemKey = `${item.productId}-${item.size}-${item.color}-${JSON.stringify(item.customMeasurements)}`;
                  const isRemoving = removingItem === itemKey;
                  const isExpanded = expandedItem === itemKey;
                  const isUpdating = updatingQuantity === itemKey;
                  
                  const discountedPrice = item.product?.discount > 0 
                    ? item.product.price - (item.product.price * item.product.discount / 100)
                    : item.product?.price || 0;

                  return (
                    <motion.div
                      key={itemKey}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 shadow-lg hover:shadow-xl transition-all ${
                        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      }`}
                    >
                      <div className="flex items-start">
                        {/* Product Image */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="relative flex-shrink-0 cursor-pointer"
                          onClick={() => navigate(`/product/${item.productId}`, { state: { product: item.product } })}
                        >
                          <img
                            src={getProductImage(item.product)}
                            alt={getProductTitle(item.product)}
                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                          />
                          {item.product?.discount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              -{item.product.discount}%
                            </div>
                          )}
                        </motion.div>

                        {/* Product Details */}
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h3 
                                className="font-serif text-lg hover:text-yellow-400 transition-colors cursor-pointer truncate"
                                onClick={() => navigate(`/product/${item.productId}`, { state: { product: item.product } })}
                              >
                                {getProductTitle(item.product)}
                              </h3>
                              <p className="text-yellow-400 text-sm truncate">{item.product?.brand || "Premium Brand"}</p>
                              
                              <div className="mt-2">
                                {item.product?.discount > 0 ? (
                                  <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 font-semibold text-lg">
                                      ${discountedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-gray-500 text-sm line-through">
                                      ${item.product.price.toFixed(2)}
                                    </span>
                                    <span className="text-green-400 text-xs bg-green-900/20 px-2 py-1 rounded">
                                      Save ${(item.product.price - discountedPrice).toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-yellow-400 font-semibold text-lg">
                                    ${(item.product?.price || 0).toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Total Price for this item */}
                            <div className="text-right pl-2">
                              <div className="text-yellow-400 font-semibold text-lg">
                                ${(discountedPrice * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-400 mt-1">
                                {item.quantity} × ${discountedPrice.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Expandable details */}
                          <div className="mt-3">
                            <button 
                              onClick={() => toggleExpandItem(itemKey)}
                              className="flex items-center text-sm text-gray-400 hover:text-gray-300 w-full justify-between py-1"
                            >
                              <span className="text-green-400 font-semibold">Item Details</span>
                              <FiChevronRight className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden mt-2"
                                >
                                  {/* Options */}
                                  <div className="flex flex-wrap gap-2">
                                    {item.size && (
                                      <span className="bg-gray-700 text-sm px-3 py-1 rounded">
                                        Size: {item.size}
                                      </span>
                                    )}
                                    {item.color && (
                                      <span className="bg-gray-700 text-sm px-3 py-1 rounded flex items-center">
                                        Color: {item.color}
                                        <span 
                                          className="w-4 h-4 rounded-full ml-2 border border-gray-600"
                                          style={{ 
                                            backgroundColor: item.color.toLowerCase().includes("black") ? "#000" :
                                            item.color.toLowerCase().includes("blue") ? "#1e40af" :
                                            item.color.toLowerCase().includes("red") ? "#dc2626" :
                                            item.color.toLowerCase().includes("white") ? "#fff" :
                                            item.color.toLowerCase().includes("green") ? "#059669" : "#d1d5db"
                                          }}
                                        />
                                      </span>
                                    )}
                                    {item.sizeType && (
                                      <span className="bg-gray-700 text-sm px-3 py-1 rounded">
                                        Type: {item.sizeType === "custom" ? "Custom Size" : "Standard Size"}
                                      </span>
                                    )}
                                  </div>

                                  {/* Custom Measurements */}
                                  {item.customMeasurements && Object.keys(item.customMeasurements).length > 0 && (
                                    <div className="mt-3">
                                      <p className="text-sm text-yellow-400 font-medium mb-2">Custom Measurements:</p>
                                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                                        {Object.entries(item.customMeasurements).map(([key, value]) => (
                                          value && (
                                            <div key={key} className="flex justify-between">
                                              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                              <span className="font-medium">{value}"</span>
                                            </div>
                                          )
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center bg-gray-700 rounded-lg p-1">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(
                                  item.productId, 
                                  item.size, 
                                  item.color, 
                                  item.customMeasurements,
                                  item.quantity - 1
                                )}
                                className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                                disabled={item.quantity <= 1 || isUpdating}
                                aria-label="Decrease quantity"
                              >
                                <FiMinus size={18} />
                              </motion.button>
                              
                              <span className="mx-4 w-8 text-center font-medium text-lg">
                                {isUpdating ? "..." : item.quantity}
                              </span>
                              
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(
                                  item.productId, 
                                  item.size, 
                                  item.color, 
                                  item.customMeasurements,
                                  item.quantity + 1
                                )}
                                className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                                disabled={isUpdating}
                                aria-label="Increase quantity"
                              >
                                <FiPlus size={18} />
                              </motion.button>
                            </div>
                            
                            {/* Delete button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(
                                item.productId, 
                                item.size, 
                                item.color, 
                                item.customMeasurements
                              )}
                              className="text-red-500 hover:text-red-400 transition-colors p-2 flex items-center text-sm"
                              aria-label="Remove item"
                              disabled={isRemoving}
                            >
                              <FiTrash2 size={16} />
                              <span className="ml-1">{isRemoving ? "Removing..." : "Remove"}</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 lg:h-fit sticky bottom-0 lg:top-24 z-20 shadow-2xl lg:shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-700 flex items-center">
                <FiShoppingBag className="mr-3 text-yellow-400" />
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                
                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Total Savings</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-400" : ""}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                {shippingCost > 0 && (
                  <div className="text-sm text-yellow-400 bg-yellow-900/20 p-3 rounded-lg">
                    Add ${(shippingThreshold - getSubtotal()).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-semibold text-xl">
                  <span>Total Amount</span>
                  <span className="text-yellow-400">${totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">Inclusive of all taxes • Free returns within 30 days</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold py-4 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all mb-4 text-lg"
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
              >
                {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
              </motion.button>
              
              <p className="text-xs text-gray-400 text-center">
                🔒 Secure payment • 30-day return policy • Worldwide shipping
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;