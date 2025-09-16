import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { backendUrl } from "../../config/config";

const Product = () => {
  const [dresses, setDresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDresses = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/dresses`);
        if (res.data && Array.isArray(res.data.dresses)) {
          setDresses(res.data.dresses);
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
  }, []);

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
      {/* Hero Section - Reduced height */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Elegance</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-yellow-200 font-serif max-w-3xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Explore our exclusive collection of beautifully crafted dresses for every occasion. 
            From casual elegance to glamorous evening wear.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <button className="bg-yellow-600 text-black hover:bg-yellow-500 font-serif font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
              Shop Collection
            </button>
          </motion.div>
        </motion.div>
        
        {/* Animated decorative elements */}
        <motion.div 
          className="absolute top-10 left-10 w-16 h-16 rounded-full bg-yellow-400/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-yellow-500/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

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
            ✨ <span className="bg-gradient-to-r from-black to-yellow-800 bg-clip-text text-transparent">Trending Dresses</span> ✨
          </h2>
          <p className="text-gray-600 font-serif max-w-2xl mx-auto">
            Discover our most popular dresses that are perfect for any occasion. 
            Each piece is carefully selected to bring out your unique style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Array.isArray(dresses) && dresses.length > 0 ? (
            dresses.map((dress, index) => (
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
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-gray-100 aspect-[3/4]">
                  <img
                    src={dress.images?.[0]?.url || dress.image?.url || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80"}
                    alt={dress.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quick actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <motion.button
                      className="bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                    
                    <motion.button
                      className="bg-white rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
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
                </div>
                
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xs uppercase tracking-widest text-yellow-700 font-serif font-semibold">
                      {dress.brand || "Luxury Brand"}
                    </h2>
                    <span className="text-xs bg-yellow-100 text-yellow-800 font-serif px-2 py-1 rounded-full">
                      {dress.category || "Dress"}
                    </span>
                  </div>
                  
                  <h3 className="text-black font-serif font-semibold text-base mb-2 line-clamp-1">
                    {dress.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10 font-serif">
                    {dress.description || "Elegant dress for special occasions"}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-serif font-bold text-black">
                      ${dress.price || "00.00"}
                    </p>
                    
                    <motion.button
                      className="bg-black text-yellow-400 px-3 py-1.5 rounded-full text-xs hover:bg-yellow-400 hover:text-black transition-all duration-300 flex items-center gap-1 font-serif"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
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