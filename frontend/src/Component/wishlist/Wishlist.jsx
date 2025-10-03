import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { 
  fetchWishlist, 
  removeFromWishlistAsync, 

  selectWishlistItems, 
  selectWishlistLoading,
  selectWishlistCount
} from "../../wishlistSlice";
import { addToCartAsync as addToCart } from "../../cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const wishlistItems = useSelector(selectWishlistItems);
  const loading = useSelector(selectWishlistLoading);
  const wishlistCount = useSelector(selectWishlistCount);
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  
  // Local state
  const [removingItems, setRemovingItems] = useState({});
  const [addingToCart, setAddingToCart] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  // Handle remove from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    setRemovingItems(prev => ({ ...prev, [productId]: true }));
    try {
      await dispatch(removeFromWishlistAsync(productId)).unwrap();
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setRemovingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  // Handle add to cart from wishlist
  const handleAddToCart = async (product) => {
    setAddingToCart(prev => ({ ...prev, [product._id]: true }));
    try {
      const cartData = {
        productId: product._id,
        quantity: 1,
        sizeType: "standard",
        size: null,
        customMeasurements: {},
        product: product
      };
      
      await dispatch(addToCart(cartData)).unwrap();
      alert("✅ Product added to cart successfully!");
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setAddingToCart(prev => ({ ...prev, [product._id]: false }));
    }
  };

  // Handle product click
  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  // If user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-yellow-200"
          >
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg 
                className="w-12 h-12 text-yellow-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              Access Your Wishlist
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Please login to view and manage your favorite items
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/login')}
                className="bg-black text-yellow-400 font-serif font-semibold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="border-2 border-black text-black font-serif font-semibold py-3 px-8 rounded-full hover:bg-black hover:text-yellow-400 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading && wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-600 mx-auto mb-4"></div>
              <p className="text-yellow-800 font-serif font-medium text-lg">Loading your wishlist...</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            My Wishlist
          </h1>
          <p className="text-gray-600 font-serif text-lg max-w-2xl mx-auto">
            {wishlistCount > 0 
              ? `You have ${wishlistCount} item${wishlistCount > 1 ? 's' : ''} saved for later` 
              : "Your wishlist is waiting to be filled with beautiful finds"}
          </p>
          
          {wishlistCount > 0 && (
            <div className="mt-6 flex justify-center gap-4">
              <Link
                to="/products"
                className="bg-black text-yellow-400 font-serif font-semibold py-2 px-6 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 text-sm"
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => dispatch(fetchWishlist())}
                className="border border-gray-300 text-gray-700 font-serif font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 text-sm"
              >
                Refresh
              </button>
            </div>
          )}
        </motion.div>

        {/* Wishlist Items */}
        <AnimatePresence>
          {wishlistCount > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  {/* Product Image */}
                  <div 
                    className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-yellow-50 aspect-[3/4] cursor-pointer"
                    onClick={() => handleProductClick(item.product)}
                  >
                    <img
                      src={item.product.images?.[0]?.url || item.product.image?.url || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"}
                      alt={item.product.title}
                      className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {/* Remove Button */}
                      <motion.button
                        className={`rounded-full p-2 shadow-lg backdrop-blur-sm ${
                          removingItems[item.product._id] 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-white/90 hover:bg-red-500 hover:text-white'
                        } transition-all duration-300`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromWishlist(item.product._id);
                        }}
                        disabled={removingItems[item.product._id]}
                      >
                        {removingItems[item.product._id] ? (
                          <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </motion.button>
                    </div>

                    {/* Discount Badge */}
                    {item.product.discount > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          {item.product.discount}% OFF
                        </span>
                      </div>
                    )}

                    {/* Added Date */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xs uppercase tracking-widest text-yellow-700 font-serif font-semibold">
                        {item.product.brand || "Premium Brand"}
                      </h2>
                      <span className="text-xs bg-yellow-100 text-yellow-800 font-medium px-2 py-1 rounded-full">
                        {item.product.category || "Dress"}
                      </span>
                    </div>
                    
                    <h3 
                      className="text-lg font-serif font-bold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-yellow-700 transition-colors"
                      onClick={() => handleProductClick(item.product)}
                    >
                      {item.product.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
                      {item.product.description || "Elegant design for special occasions"}
                    </p>
                    
                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-serif font-bold text-gray-800">
                          ${(item.product.price - (item.product.price * (item.product.discount || 0) / 100)).toFixed(2)}
                        </span>
                        {item.product.discount > 0 && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ${item.product.price.toFixed(2)}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 font-medium px-1.5 py-0.5 rounded">
                              Save {item.product.discount}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        className={`flex-1 bg-black text-yellow-400 font-medium py-2.5 px-4 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-2 ${
                          addingToCart[item.product._id] ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(item.product);
                        }}
                        disabled={addingToCart[item.product._id]}
                      >
                        {addingToCart[item.product._id] ? (
                          <>
                            <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                            Adding...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            Add to Cart
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        className="p-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleProductClick(item.product)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty Wishlist State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 border border-yellow-200">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                  Your Wishlist is Empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Start exploring our collection and save your favorite items for later!
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-black text-yellow-400 font-serif font-semibold py-3 px-8 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
                >
                  Explore Products
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;