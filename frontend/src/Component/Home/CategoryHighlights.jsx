import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryHighlights = () => {
  const categories = [
    {
      title: "Dresses",
      image:
        "https://plus.unsplash.com/premium_photo-1673977132933-2a028c2f05a8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGFkaWVzJTIwZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
      link: "/products",
    },
    {
      title: "Tops",
      image:
        "https://images.unsplash.com/photo-1721190164320-57c44eac1d0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFkaWVzJTIwZHJlc3Nlc3xlbnwwfHwwfHx8MA%3D%3D",
      link: "/category/tops",
    },
    {
      title: "Bottoms",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      link: "/category/bottoms",
    },
    {
      title: "Jumpsuits",
      image:
        "https://plus.unsplash.com/premium_photo-1673758905701-602d0a961d07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8anVtcHN1aXRzfGVufDB8fDB8fHww",
      link: "/category/jumpsuits",
    },
    {
      title: "Coats",
      image:
        "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29hdHN8ZW58MHx8MHx8fDA%3D",
      link: "/category/coats",
    },
    {
      title: "Bridesmaid",
      image:
        "https://images.unsplash.com/photo-1629046133174-b5c0d944640b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJpZGVzbWFpZHxlbnwwfHwwfHx8MA%3D%3D",
      link: "/category/bridesmaid",
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block mb-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-500 mr-3 inline-block align-middle"></div>
            <span className="text-yellow-600 text-sm tracking-widest uppercase">
              Category Highlights
            </span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-500 ml-3 inline-block align-middle"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900">
            Explore Our{" "}
            <span className="text-yellow-600">Collections</span>
          </h2>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={cat.link}>
                {/* Image */}
                <motion.img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-700"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-500"></div>

                {/* Animated Golden Border */}
                <div className="absolute inset-0 border-2 border-yellow-500 opacity-0 group-hover:opacity-100 animate-pulse"></div>

                {/* Title */}
                <motion.div
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3 tracking-wide">
                    {cat.title}
                  </h3>
                  <span className="inline-block border border-yellow-500 text-yellow-500 px-6 py-2 text-sm font-medium rounded-full group-hover:bg-yellow-500 group-hover:text-black transition-all duration-300">
                    Explore Now
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
