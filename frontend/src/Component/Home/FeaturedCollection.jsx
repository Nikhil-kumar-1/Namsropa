import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeaturedCollection = () => {
  const collections = [
    {
      title: "Bridal Collection 2025",
      description: "Exquisite bridal wear with intricate embroidery and timeless elegance",
      image: "https://namsropa.in/wp-content/uploads/2025/08/Sash-Tie-Sequin-Mesh-Sheath-Dress-4.jpg",
      items: 24,
      link: "/collections/bridal-2025"
    },
    {
      title: "New Arrivals",
      description: "Fresh designs that redefine contemporary luxury fashion",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1170&q=80",
      items: 18,
      link: "/collections/new-arrivals"
    },
    {
      title: "Festive Collection",
      description: "Celebrate special occasions with our luxurious festive wear",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1172&q=80",
      items: 32,
      link: "/collections/festive"
    }
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleCollectionClick = (link) => {
    console.log(`Navigating to: ${link}`);
  };

  return (
    <section className="py-20 bg-white px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-yellow-500 mr-4 inline-block align-middle"></div>
            <span className="text-yellow-600 text-sm tracking-widest">COLLECTIONS</span>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-yellow-500 ml-4 inline-block align-middle"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Featured <span className="text-yellow-600">Collections</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Discover our latest creations crafted with precision and passion for the discerning few
          </p>
        </motion.div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {collections.map((collection, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer bg-white shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCollectionClick(collection.link)}
            >
              {/* Collection Image */}
              <div className="relative h-96 overflow-hidden rounded-t-2xl">
                <motion.img 
                  src={collection.image} 
                  alt={collection.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Items Count Badge */}
                <div className="absolute top-5 right-5 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-md tracking-wider">
                  {collection.items} ITEMS
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <motion.h3 
                  className="text-2xl font-serif font-bold text-gray-900 mb-3"
                  initial={false}
                  animate={{ y: hoveredCard === index ? -5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {collection.title}
                </motion.h3>
                <p className="text-gray-600 mb-5 text-sm font-light">
                  {collection.description}
                </p>
                
                {/* Explore Collection */}
                <div className="flex items-center gap-3 text-yellow-600 font-medium text-sm tracking-wider relative">
                  {/* Animated Square */}
                  <motion.div
                    className="w-4 h-4 border-2 border-yellow-500"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={hoveredCard === index ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <span className="text-black">EXPLORE COLLECTION</span>
                  <motion.svg 
                    className="w-4 h-4 text-yellow-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                    animate={{ x: hoveredCard === index ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </motion.svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-white border border-yellow-500 text-yellow-600 px-10 py-4 rounded-full font-medium text-lg tracking-wider shadow-md hover:shadow-lg transition relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => console.log("View all collections clicked")}
          >
            <span className="relative z-10 flex items-center justify-center">
              VIEW ALL COLLECTIONS
              <svg 
                className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
