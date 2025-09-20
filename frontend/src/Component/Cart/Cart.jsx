import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart, clearCart } from "../../cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiStar, FiChevronRight } from "react-icons/fi";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [removingItem, setRemovingItem] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  const handleUpdateQuantity = (productId, size, color, customMeasurements, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, size, color, customMeasurements, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId, size, color, customMeasurements) => {
    const itemKey = `${productId}-${size}-${color}-${JSON.stringify(customMeasurements)}`;
    setRemovingItem(itemKey);
    setTimeout(() => {
      dispatch(removeFromCart({ productId, size, color, customMeasurements }));
      setRemovingItem(null);
    }, 500);
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const shippingThreshold = 500;
  const shippingCost = getTotal() >= shippingThreshold ? 0 : 50;
  const totalAmount = getTotal() + shippingCost;

  // Calculate savings from discounts
  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      if (item.product.discount > 0) {
        const originalPrice = item.product.originalPrice || item.product.price;
        const discountAmount = (originalPrice * item.product.discount / 100) * item.quantity;
        return savings + discountAmount;
      }
      return savings;
    }, 0);
  };

  const savings = calculateSavings();

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

  // Toggle item details expansion
  const toggleExpandItem = (itemKey) => {
    setExpandedItem(expandedItem === itemKey ? null : itemKey);
  };

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
          </button>
          
          <div className="text-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Your Cart
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center text-red-500 hover:text-red-400 transition-colors p-2"
              aria-label="Clear cart"
            >
              <FiTrash2 className="text-lg" />
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
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 mb-6">
              <FiShoppingBag className="text-3xl text-yellow-500" />
            </div>
            <p className="text-xl font-semibold mb-4">Your cart is empty</p>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm">
              Looks like you haven't added any items to your cart yet. Start shopping to find amazing products!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all text-sm"
            >
              Explore Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => {
                  const itemKey = `${item.product._id}-${item.size}-${item.color}-${JSON.stringify(item.customMeasurements)}`;
                  const isRemoving = removingItem === itemKey;
                  const isExpanded = expandedItem === itemKey;
                  
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
                          className="relative flex-shrink-0"
                          onClick={() => navigate(`/product/${item.product._id}`, { state: { product: item.product } })}
                        >
                          <img
                            src={item.product.images?.[0]?.url || item.product.image?.url || "/placeholder-image.jpg"}
                            alt={item.product.title}
                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                          />
                          {item.product.discount > 0 && (
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
                                className="font-serif text-base hover:text-yellow-400 transition-colors cursor-pointer truncate"
                                onClick={() => navigate(`/product/${item.product._id}`, { state: { product: item.product } })}
                              >
                                {item.product.title}
                              </h3>
                              <p className="text-yellow-400 text-xs truncate">{item.product.brand}</p>
                              
                              {/* Price - Moved to be more visible */}
                              <div className="mt-1">
                                {item.product.discount > 0 ? (
                                  <div className="flex items-center">
                                    <span className="text-yellow-400 font-semibold text-sm">
                                      ${(item.product.price - (item.product.price * item.product.discount / 100)).toFixed(2)}
                                    </span>
                                    <span className="text-gray-500 text-xs line-through ml-2">
                                      ${item.product.price.toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-yellow-400 font-semibold text-sm">
                                    ${item.product.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Total Price for this item */}
                            <div className="text-right pl-2">
                              <div className="text-yellow-400 font-semibold text-base">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {item.quantity} × ${item.product.price.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          {/* Expandable details */}
                          <div className="mt-2">
                            <button 
                              onClick={() => toggleExpandItem(itemKey)}
                              className="flex items-center text-xs text-gray-400 hover:text-gray-300 w-full justify-between py-1"
                            >
                              <span className="text-green-500 font-bold font-serif">View details</span>
                              <FiChevronRight className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  {/* Options */}
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {item.size && (
                                      <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                                        Size: {item.size}
                                      </span>
                                    )}
                                    {item.color && (
                                      <span className="bg-gray-700 text-xs px-2 py-1 rounded flex items-center">
                                        Color: 
                                        <span 
                                          className="w-3 h-3 rounded-full ml-1 border border-gray-600"
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
                                  </div>

                                  {/* Custom Measurements */}
                                  {item.customMeasurements && Object.keys(item.customMeasurements).length > 0 && (
                                    <div className="mt-3">
                                      <p className="text-xs text-yellow-400 font-medium mb-1">Custom Measurements:</p>
                                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
                                        {Object.entries(item.customMeasurements).map(([key, value]) => (
                                          value && (
                                            <div key={key} className="flex justify-between">
                                              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                              <span className="font-medium">{value}</span>
                                            </div>
                                          )
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* Savings info */}
                                  {item.product.discount > 0 && (
                                    <div className="text-green-400 text-xs mt-2">
                                      Save ${((item.product.price * item.product.discount / 100) * item.quantity).toFixed(2)}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          {/* Quantity Controls - Moved below the price */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center bg-gray-700 rounded-lg p-1">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(
                                  item.product._id, 
                                  item.size, 
                                  item.color, 
                                  item.customMeasurements,
                                  item.quantity - 1
                                )}
                                className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                                disabled={item.quantity <= 1}
                                aria-label="Decrease quantity"
                              >
                                <FiMinus size={16} />
                              </motion.button>
                              <span className="mx-3 w-2 text-center font-medium">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateQuantity(
                                  item.product._id, 
                                  item.size, 
                                  item.color, 
                                  item.customMeasurements,
                                  item.quantity + 1
                                )}
                                className="p-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FiPlus size={16} />
                              </motion.button>
                            </div>
                            
                            {/* Delete button - Moved to the right side */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(
                                item.product._id, 
                                item.size, 
                                item.color, 
                                item.customMeasurements
                              )}
                              className="text-red-500 hover:text-red-400 transition-colors p-1 flex items-center"
                              aria-label="Remove item"
                            >
                              <FiTrash2 size={15} />
                              <span className="ml-1 text-sm">Remove</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Order Summary - Sticky on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 lg:h-fit sticky bottom-0 lg:top-24 z-20 shadow-2xl lg:shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-gray-700 flex items-center">
                <FiShoppingBag className="mr-2 text-yellow-400" />
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shippingCost === 0 ? "text-green-400" : ""}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                
                {shippingCost > 0 && (
                  <div className="text-xs text-yellow-400 bg-yellow-900/20 p-2 rounded">
                    Add ${(shippingThreshold - getTotal()).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-5">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-yellow-400">${totalAmount.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Inclusive of all taxes</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold py-3 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all mb-3 text-base"
              >
                Proceed to Checkout
              </motion.button>
              
              <p className="text-xs text-gray-400 text-center">
                Free returns within 30 days • Secure payment
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;