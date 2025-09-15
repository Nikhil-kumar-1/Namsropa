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
        // Assuming backend sends { success: true, dresses: [...] }
        if (res.data && Array.isArray(res.data.dresses)) {
          setDresses(res.data.dresses);
        } else {
          setDresses([]); // fallback to empty array
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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1744&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-serif md:text-6xl font-bold mb-4 text-white tracking-wide">
            Discover Your Style
          </h1>
          <p className="text-yellow-500 max-w-4xl mx-auto text-xl font-light italic">
            Explore our exclusive collection of beautifully crafted dresses for
            every occasion.
          </p>
        </motion.div>
      </div>

      {/* Dress Gallery Section */}
      <section className="py-16 px-6">
        <motion.h2
          className="text-4xl font-bold text-center mb-4 text-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          ✨ Trending Dresses ✨
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover our most popular dresses that are perfect for any occasion
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {Array.isArray(dresses) && dresses.length > 0 ? (
            dresses.map((dress, index) => (
              <motion.div
                key={dress._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dress.images?.[0]?.url || dress.image}
                    alt={dress.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <motion.button
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-600"
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
                </div>
                <div className="p-5">
                  <h2 className="text-sm text-yellow-600 font-semibold mb-1">
                    {dress.brand}
                  </h2>
                  <p className="text-gray-700 font-medium line-clamp-2 mb-3">
                    {dress.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      {dress.price}
                    </p>
                    <motion.button
                      className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors duration-300 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
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
            <p className="text-center col-span-full text-gray-500">
              No dresses available
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;
