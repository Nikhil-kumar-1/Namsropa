import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { backendUrl } from '../../config/config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cartSlice'; // Import the addToCart action

const CategoryPage = () => {
  const [clothes, setClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  // Fetch clothes based on category from URL
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = `${backendUrl}/api/dresses`;
        
        // If category is specified in URL, filter by that category
        if (category && category !== 'all') {
          url = `${backendUrl}/api/dresses/category/${category}`;
        }

        const res = await axios.get(url);
        
        if (res.data && Array.isArray(res.data.dresses)) {
          setClothes(res.data.dresses);
        } else if (Array.isArray(res.data)) {
          // Handle case where API returns array directly
          setClothes(res.data);
        } else {
          setClothes([]);
        }
      } catch (err) {
        console.error("Failed to fetch clothes:", err);
        setError("Failed to load clothing items");
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, [category]);

  // Sort clothes based on selected sort option
  const sortedClothes = React.useMemo(() => {
    let result = [...clothes];
    
    // Sort items
    switch(sortBy) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'newest':
        return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'rating':
        return result.sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0));
      default:
        return result;
    }
  }, [sortBy, clothes]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    navigate(`/category/${newCategory}`);
  };

  // Handle add to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent navigating to product page
    
    // Create cart item with required properties
    const cartItem = {
      product: {
        _id: product._id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        images: product.images,
        image: product.image,
        brand: product.brand,
        rating: product.rating
      },
      quantity: 1,
      size: null, // You might want to add size selection
      color: null, // You might want to add color selection
      customMeasurements: {} // You might want to add custom measurements
    };
    
    // Dispatch addToCart action
    dispatch(addToCart(cartItem));
    
    // Show success feedback (you could use a toast notification here)
    console.log("Added to cart:", product.title);
    
    // Optional: Show a quick confirmation message
    // You might want to implement a proper toast notification system
    const button = e.target;
    const originalText = button.innerHTML;
    button.innerHTML = '✓ Added!';
    button.classList.add('bg-green-500');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('bg-green-500');
    }, 1500);
  };

  // Get category display name
  const getCategoryDisplayName = () => {
    if (!category || category === 'all') return 'All Collections';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-yellow-200 font-serif font-medium">Loading exquisite collections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex justify-center items-center">
        <div className="text-center bg-gray-800 p-8 rounded-2xl shadow-lg max-w-md border border-yellow-700">
          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-bold text-white mb-2">Oops!</h3>
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-600 hover:bg-yellow-500 text-black font-serif font-medium py-2 px-6 rounded-full transition-colors shadow-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 pt-20 pb-16">
      {/* Header Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/20 to-black/70 z-0"></div>
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Explore Our <span className="text-yellow-400">{getCategoryDisplayName()}</span>
          </motion.h1>
          <motion.p
            className="text-lg text-yellow-200 font-serif max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {category === 'jumpsuits' 
              ? 'Discover our stunning collection of jumpsuits for every occasion. Perfect for making a statement with style and comfort.'
              : 'Discover our carefully curated collections for every occasion and style. From casual everyday wear to exquisite formal attire.'
            }
          </motion.p>
        </div>
      </div>

      {/* Sort and Results Count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-center mb-8 bg-gray-800/50 p-4 rounded-lg border border-yellow-800/30">
          <p className="text-yellow-200 font-serif">
            Showing <span className="text-white">{sortedClothes.length}</span> items
            {category && category !== 'all' && (
              <span> in <span className="text-white capitalize">{category}</span></span>
            )}
          </p>
          
          <div className="flex items-center space-x-2">
            <span className="text-yellow-200 font-serif">Sort by:</span>
            <select 
              className="bg-gray-900 text-white border border-yellow-800/30 rounded-lg px-3 py-2 font-serif focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {['all','tops', 'bottoms', 'jumpsuits', 'coats', 'bridesmaid'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full font-serif text-sm transition-all ${
                category === cat
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Clothing Grid */}
        {sortedClothes.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {sortedClothes.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group border border-gray-700"
                onClick={() => navigate(`/product/${item._id}`, { state: { product: item } })}
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700 aspect-[3/4]">
                  <img
                    src={item.images?.[0]?.url || item.image?.url || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-black text-xs font-serif font-bold px-2 py-1 rounded-full capitalize">
                      {item.category || "clothing"}
                    </span>
                  </div>
                  
                  {/* Quick actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <motion.button
                      className="bg-gray-900 rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to favorites logic here
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
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
                      className="bg-gray-900 rounded-full p-2 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Quick view logic here
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xs uppercase tracking-widest text-yellow-500 font-serif font-semibold">
                      {item.brand || "Fashion Brand"}
                    </h2>
                    {item.rating?.average > 0 && (
                      <div className="flex items-center text-white text-xs">
                        <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {item.rating.average.toFixed(1)}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-white font-serif font-semibold text-lg mb-2 line-clamp-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">
                    {item.description || "Stylish clothing item for your collection"}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-serif font-bold text-yellow-400">
                        ${item.price || "00.00"}
                      </p>
                      {item.originalPrice > item.price && (
                        <p className="text-gray-500 text-sm line-through">
                          ${item.originalPrice}
                        </p>
                      )}
                    </div>
                    
                    <motion.button
                      className="bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm hover:bg-yellow-400 transition-all duration-300 flex items-center gap-1 font-serif"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleAddToCart(e, item)}
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-16 bg-gray-800/50 rounded-xl p-8 border border-yellow-800/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-16 w-16 text-yellow-500/30"
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
              <h3 className="mt-6 text-xl font-serif font-bold text-white">No items found</h3>
              <p className="mt-3 text-gray-400 font-serif">
                {category && category !== 'all' 
                  ? `We couldn't find any items in the ${category} category.`
                  : "We're updating our collection. Check back soon for new arrivals!"
                }
              </p>
              {category && category !== 'all' && (
                <button 
                  className="mt-6 bg-yellow-600 text-black font-serif font-medium py-2 px-6 rounded-full transition-all hover:bg-yellow-500"
                  onClick={() => handleCategoryChange('all')}
                >
                  View All Collections
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;