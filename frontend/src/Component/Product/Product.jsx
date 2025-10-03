import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { backendUrl } from "../../config/config";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlistAsync, removeFromWishlistAsync, checkWishlistStatus, selectIsInWishlist } from "../../wishlistSlice";

const Product = () => {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state - sabhi hooks component ke top level par hain
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  const wishlistLoading = useSelector((state) => state.wishlist?.loading);
  const wishlistStatus = useSelector((state) => state.wishlist?.wishlistStatus || {});

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/dresses`);
        if (res.data && Array.isArray(res.data.dresses)) {
          setDresses(res.data.dresses);
          
          // Check wishlist status for each product if user is authenticated
          if (isAuthenticated) {
            res.data.dresses.forEach(dress => {
              dispatch(checkWishlistStatus(dress._id));
            });
          }
        } else {
          setDresses([]);
        }
      } catch (err) {
        console.error("Failed to fetch dresses:", err);
        setError("Failed to load dresses");
      } finally {
        setLoading(false);
      }
    };

    fetchDresses();
  }, [dispatch, isAuthenticated]);

  // Function to handle product click
  const handleProductClick = (dress) => {
    navigate(`/product/${dress._id}`, { state: { product: dress } });
  };

  // Function to handle wishlist toggle
  const handleWishlistToggle = async (e, dress) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }

    const isInWishlist = wishlistStatus[dress._id];
    
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlistAsync(dress._id)).unwrap();
      } else {
        await dispatch(addToWishlistAsync(dress._id)).unwrap();
      }
    } catch (error) {
      alert(`Error: ${error}`);
      if (error.includes("Session expired") || error.includes("Please login")) {
        navigate("/login");
      }
    }
  };

  // Helper function to check if product is in wishlist
  const isProductInWishlist = (productId) => {
    return wishlistStatus[productId] || false;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-yellow-800 font-serif font-medium">Curating beautiful dresses...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 to-black">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md border border-yellow-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Oops!</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-serif font-medium py-2 px-6 rounded-full transition-colors shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Dress Gallery Section */}
      <section className="py-12 px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-black">
            <span className="bg-gradient-to-r from-black to-yellow-800 bg-clip-text text-transparent">Trending Dresses</span>
          </h2>
          <p className="text-gray-600 font-serif max-w-2xl mx-auto">
            Discover our most popular dresses that are perfect for any occasion. 
            Each piece is carefully selected to bring out your unique style.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {Array.isArray(dresses) && dresses.length > 0 ? (
            dresses.map((dress, index) => {
              const isInWishlist = isProductInWishlist(dress._id);
              
              return (
                <motion.div
                  key={dress._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group border border-gray-100"
                  onClick={() => handleProductClick(dress)}
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-gray-100 aspect-[3/4]">
                    <img
                      src={dress.images?.[0]?.url || dress.image?.url || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80"}
                      alt={dress.title}
                      className="w-full h-full object-fit group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Wishlist Button - Top Right */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <motion.button
                        className={`rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-500'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleWishlistToggle(e, dress)}
                        disabled={wishlistLoading}
                      >
                        {isInWishlist ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
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
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        )}
                      </motion.button>
                    </div>
                    
                    {/* New badge */}
                    {index < 4 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-black text-yellow-400 text-xs font-serif font-bold px-2 py-1 rounded-full">
                          NEW
                        </span>
                      </div>
                    )}

                    {/* Wishlist indicator (always visible if in wishlist) */}
                    {isInWishlist && (
                      <div className="absolute top-3 right-3 sm:hidden">
                        <div className="bg-red-500 rounded-full p-1 shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 sm:p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xs uppercase tracking-widest text-yellow-700 font-serif font-semibold">
                        {dress.brand || "Luxury Brand"}
                      </h2>
                      <span className="text-xs bg-yellow-100 text-yellow-800 font-serif px-2 py-1 rounded-full">
                        {dress.category || "Dress"}
                      </span>
                    </div>
                    
                    <h3 className="text-black font-serif font-semibold text-sm sm:text-base mb-2 line-clamp-1">
                      {dress.title}
                    </h3>
                    
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 h-8 sm:h-10 font-serif">
                      {dress.description || "Elegant dress for special occasions"}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-base sm:text-lg font-serif font-bold text-black">
                        ${dress.price || "00.00"}
                      </p>
                      
                      {/* Add to Wishlist Button - Bottom Right */}
                      <motion.button
                        className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-1 font-serif ${
                          isInWishlist 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleWishlistToggle(e, dress)}
                        disabled={wishlistLoading}
                      >
                        {wishlistLoading ? (
                          <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                          </svg>
                        ) : isInWishlist ? (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="hidden sm:inline">In Wishlist</span>
                            <span className="sm:hidden">Added</span>
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            <span className="hidden sm:inline">Wishlist</span>
                            <span className="sm:hidden">Save</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              className="text-center col-span-full py-12 bg-white rounded-xl p-6 shadow-md border border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <svg
                  className="mx-auto h-16 w-16 text-yellow-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-xl font-serif font-bold text-black">No dresses available</h3>
                <p className="mt-2 text-gray-600 font-serif text-sm">We're updating our collection. Check back soon for new arrivals!</p>
                <button className="mt-4 bg-black text-yellow-400 font-serif font-medium py-2 px-5 rounded-full transition-all hover:bg-yellow-400 hover:text-black text-sm">
                  Notify Me
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;