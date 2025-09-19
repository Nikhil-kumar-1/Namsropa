import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateQuantity, removeFromCart, clearCart } from "../../cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiStar } from "react-icons/fi";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [removingItem, setRemovingItem] = useState(null);

  const handleUpdateQuantity = (productId, size, color, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, size, color, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId, size, color) => {
    setRemovingItem(`${productId}-${size}-${color}`);
    setTimeout(() => {
      dispatch(removeFromCart({ productId, size, color }));
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate("/products")}
            className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Your Shopping Cart
            </h1>
            <p className="text-gray-400 mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center text-red-500 hover:text-red-400 transition-colors"
            >
              <FiTrash2 className="mr-1" />
              Clear Cart
            </button>
          )}
        </motion.div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-800 mb-6">
              <FiShoppingBag className="text-4xl text-yellow-500" />
            </div>
            <p className="text-2xl font-semibold mb-4">Your cart is empty</p>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Looks like you haven't added any items to your cart yet. Start shopping to find amazing products!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all"
            >
              Explore Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => {
                  const itemKey = `${item.product._id}-${item.size}-${item.color}`;
                  const isRemoving = removingItem === itemKey;
                  
                  return (
                    <motion.div
                      key={itemKey}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 border border-gray-700 shadow-lg hover:shadow-xl transition-all ${
                        isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
                      }`}
                    >
                      <div className="flex items-start">
                        {/* Product Image */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="relative flex-shrink-0"
                        >
                          <img
                            src={item.product.images?.[0]?.url || item.product.image?.url || "/placeholder-image.jpg"}
                            alt={item.product.title}
                            className="w-28 h-28 object-cover rounded-lg shadow-md"
                          />
                          {item.product.discount > 0 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                              -{item.product.discount}%
                            </div>
                          )}
                        </motion.div>

                        {/* Product Details */}
                        <div className="ml-5 flex-1">
                          <h3 className="font-semibold text-lg hover:text-yellow-400 transition-colors cursor-pointer"
                              onClick={() => navigate(`/product/${item.product._id}`, { state: { product: item.product } })}>
                            {item.product.title}
                          </h3>
                          <p className="text-yellow-400 text-sm">{item.product.brand}</p>
                          
                          {/* Rating */}
                          <div className="flex items-center mt-1 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FiStar 
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= Math.floor(item.product.rating?.average || 0)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400 ml-1">
                              ({item.product.rating?.count || 0})
                            </span>
                          </div>

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

                          {/* Price */}
                          <div className="mt-3">
                            {item.product.discount > 0 ? (
                              <div className="flex items-center">
                                <span className="text-yellow-400 font-semibold">
                                  ${(item.product.price - (item.product.price * item.product.discount / 100)).toFixed(2)}
                                </span>
                                <span className="text-gray-500 text-sm line-through ml-2">
                                  ${item.product.price.toFixed(2)}
                                </span>
                                <span className="text-red-400 text-sm ml-2">
                                  Save ${((item.product.price * item.product.discount / 100) * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-yellow-400 font-semibold">
                                ${item.product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex items-center bg-gray-700 rounded-lg p-1">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateQuantity(item.product._id, item.size, item.color, item.quantity - 1)}
                              className="p-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <FiMinus size={14} />
                            </motion.button>
                            <span className="mx-3 w-6 text-center font-medium">{item.quantity}</span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleUpdateQuantity(item.product._id, item.size, item.color, item.quantity + 1)}
                              className="p-1 text-gray-300 hover:text-white hover:bg-gray-600 rounded transition-colors"
                            >
                              <FiPlus size={14} />
                            </motion.button>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveItem(item.product._id, item.size, item.color)}
                            className="text-red-500 hover:text-red-400 transition-colors p-2"
                          >
                            <FiTrash2 size={16} />
                          </motion.button>
                          
                          <div className="text-yellow-400 font-semibold text-sm">
                            ${(item.product.price * item.quantity).toFixed(2)}
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 h-fit sticky top-24"
            >
              <h2 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-700 flex items-center">
                <FiShoppingBag className="mr-2 text-yellow-400" />
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
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
                  <div className="text-sm text-yellow-400 bg-yellow-900/20 p-2 rounded">
                    Add ${(shippingThreshold - getTotal()).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-yellow-400">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold py-3 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition-all mb-4"
              >
                Proceed to Checkout
              </motion.button>
              
              <p className="text-xs text-gray-400 text-center">
                Free returns within 30 days
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;