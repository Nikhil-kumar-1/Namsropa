import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Mock data for 12 products based on your schema
const mockProducts = [
  {
    _id: "1",
    name: "Classic Cotton T-Shirt",
    description: "Premium quality cotton t-shirt with perfect fit and comfort for everyday wear.",
    basePrice: 24.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "White",
            imageUrls: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"],
            additionalPrice: 0
          },
          {
            value: "Black",
            imageUrls: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Clothing", "T-Shirts"],
    tags: ["casual", "cotton", "basic"],
    stock: 50,
    isActive: true
  },
  {
    _id: "2",
    name: "Designer Hoodie",
    description: "Warm and comfortable hoodie with premium design details and soft inner lining.",
    basePrice: 49.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Gray",
            imageUrls: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Clothing", "Hoodies"],
    tags: ["warm", "streetwear", "designer"],
    stock: 30,
    isActive: true
  },
  {
    _id: "3",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with stretch for comfort and contemporary style.",
    basePrice: 69.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Blue",
            imageUrls: ["https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"],
            additionalPrice: 0
          },
          {
            value: "Black",
            imageUrls: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"],
            additionalPrice: 5.99
          }
        ]
      }
    ],
    categories: ["Clothing", "Jeans"],
    tags: ["denim", "slim fit", "stretch"],
    stock: 40,
    isActive: true
  },
  {
    _id: "4",
    name: "Leather Jacket",
    description: "Genuine leather jacket with classic biker style and premium finish.",
    basePrice: 199.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Brown",
            imageUrls: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"],
            additionalPrice: 0
          },
          {
            value: "Black",
            imageUrls: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"],
            additionalPrice: 20.99
          }
        ]
      }
    ],
    categories: ["Clothing", "Jackets"],
    tags: ["leather", "biker", "premium"],
    stock: 15,
    isActive: true
  },
  {
    _id: "5",
    name: "Running Shoes",
    description: "High-performance running shoes with cushion technology and breathable mesh.",
    basePrice: 89.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "White/Red",
            imageUrls: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
            additionalPrice: 0
          },
          {
            value: "Black/Blue",
            imageUrls: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Footwear", "Running"],
    tags: ["sports", "comfort", "performance"],
    stock: 25,
    isActive: true
  },
  {
    _id: "6",
    name: "Casual Sneakers",
    description: "Stylish casual sneakers perfect for everyday wear with comfort insole.",
    basePrice: 59.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "White",
            imageUrls: ["https://images.unsplash.com/photo-1605030753481-bb38b08c384a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Footwear", "Sneakers"],
    tags: ["casual", "style", "comfort"],
    stock: 35,
    isActive: true
  },
  {
    _id: "7",
    name: "Winter Beanie",
    description: "Warm acrylic beanie for cold weather with soft texture and modern fit.",
    basePrice: 19.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Gray",
            imageUrls: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
            additionalPrice: 0
          },
          {
            value: "Navy",
            imageUrls: ["https://images.unsplash.com/photo-1631610326149-bc78fe6a202f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Accessories", "Hats"],
    tags: ["winter", "warm", "acrylic"],
    stock: 60,
    isActive: true
  },
  {
    _id: "8",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots and cash compartment.",
    basePrice: 34.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Brown",
            imageUrls: ["https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Accessories", "Wallets"],
    tags: ["leather", "minimalist", "premium"],
    stock: 45,
    isActive: true
  },
  {
    _id: "9",
    name: "Backpack",
    description: "Durable backpack with laptop compartment and multiple organizational pockets.",
    basePrice: 79.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Black",
            imageUrls: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
            additionalPrice: 0
          },
          {
            value: "Green",
            imageUrls: ["https://images.unsplash.com/photo-1585916420730-d3f3a91cb9fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
            additionalPrice: 5.99
          }
        ]
      }
    ],
    categories: ["Accessories", "Bags"],
    tags: ["durable", "laptop", "travel"],
    stock: 20,
    isActive: true
  },
  {
    _id: "10",
    name: "Sunglasses",
    description: "UV protection sunglasses with polarized lenses and lightweight frame.",
    basePrice: 39.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Black",
            imageUrls: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Accessories", "Eyewear"],
    tags: ["UV protection", "polarized", "style"],
    stock: 55,
    isActive: true
  },
  {
    _id: "11",
    name: "Watch",
    description: "Elegant analog watch with leather strap and water resistance.",
    basePrice: 129.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Brown",
            imageUrls: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Accessories", "Watches"],
    tags: ["elegant", "leather", "analog"],
    stock: 18,
    isActive: true
  },
  {
    _id: "12",
    name: "Winter Scarf",
    description: "Soft wool blend scarf with fringe details and warm insulation.",
    basePrice: 29.99,
    imageGroups: [
      {
        name: "Color",
        options: [
          {
            value: "Plaid",
            imageUrls: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
            additionalPrice: 0
          }
        ]
      }
    ],
    categories: ["Accessories", "Scarves"],
    tags: ["wool", "warm", "winter"],
    stock: 40,
    isActive: true
  }
];

const ProductShowcase = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Initialize selected options when a product is selected
  useEffect(() => {
    if (selectedProduct) {
      const initialSelections = {};
      selectedProduct.imageGroups.forEach(group => {
        if (group.options.length > 0) {
          initialSelections[group.name] = group.options[0].value;
        }
      });
      setSelectedOptions(initialSelections);
    }
  }, [selectedProduct]);

  const calculateTotalPrice = (product) => {
    if (!product) return 0;
    
    let total = product.basePrice;
    Object.values(selectedOptions).forEach(optionValue => {
      product.imageGroups.forEach(group => {
        const option = group.options.find(opt => opt.value === optionValue);
        if (option) {
          total += option.additionalPrice;
        }
      });
    });
    return total * quantity;
  };

  const handleAddToCart = (product) => {
    alert(`Added to cart: ${product.name}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section with Parallax */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black/60 z-1"></div>
        
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-6">Our Collection</h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
            Discover premium quality products crafted with attention to detail
          </p>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product._id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.imageGroups[0].options[0].imageUrls[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${product.basePrice.toFixed(2)}</span>
                    <motion.button 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={selectedProduct.imageGroups[0].options[0].imageUrls[0]} 
                        alt={selectedProduct.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    
                    <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedProduct.categories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Customize Your Product</h3>
                    
                    {selectedProduct.imageGroups.map((group, groupIndex) => (
                      <div key={groupIndex} className="mb-6">
                        <h4 className="font-medium mb-2">{group.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {group.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              className={`px-4 py-2 rounded border ${
                                selectedOptions[group.name] === option.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300 hover:border-gray-400'
                              }`}
                              onClick={() => setSelectedOptions({
                                ...selectedOptions,
                                [group.name]: option.value
                              })}
                            >
                              {option.value}
                              {option.additionalPrice > 0 && (
                                <span className="text-blue-600 ml-1">
                                  (+${option.additionalPrice.toFixed(2)})
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Quantity</h4>
                      <div className="flex items-center">
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                          -
                        </button>
                        <span className="mx-4 font-medium">{quantity}</span>
                        <button 
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                          onClick={() => setQuantity(q => q + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-2xl font-bold">
                        ${calculateTotalPrice(selectedProduct).toFixed(2)}
                      </span>
                      <motion.button 
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {selectedProduct.stock > 10 ? (
                        <span className="text-green-600">In stock ({selectedProduct.stock} available)</span>
                      ) : selectedProduct.stock > 0 ? (
                        <span className="text-amber-600">Only {selectedProduct.stock} left in stock!</span>
                      ) : (
                        <span className="text-red-600">Out of stock</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animation wrapper component
const AnimatePresence = ({ children }) => {
  return <div>{children}</div>;
};

export default ProductShowcase;