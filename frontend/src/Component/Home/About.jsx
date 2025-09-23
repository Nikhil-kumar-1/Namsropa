import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="bg-black text-white">
      {/* Background Image with Parallax Effect */}
      <div
        className="relative h-[60vh] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.h1
          className="relative z-10 text-5xl md:text-6xl font-serif font-bold"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Story
        </motion.h1>
      </div>

      {/* Heritage Section */}
      <section className="py-16 px-6">
        <div className="overflow-hidden max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Our Heritage
            </h2>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Founded in 2001, our maison has redefined luxury fashion through a
              unique blend of traditional craftsmanship and contemporary design.
              Each piece tells a story of cultural heritage, meticulous
              artistry, and innovative vision.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Our designs are created by master artisans who employ time-honored
              techniques passed down through generations, ensuring that every
              garment is not just clothing, but a wearable piece of art.
            </p>
           <Link to="/about"> <button className=" cursor-pointer border border-yellow-500 text-yellow-500 px-6 py-2 rounded-sm hover:bg-yellow-500 hover:text-black transition duration-300">
              Discover Our Process
            </button></Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square  bg-gray-800 rounded-lg overflow-hidden">
              <img
                src="https://plus.unsplash.com/premium_photo-1663013425512-23e2050e694d?w=600&auto=format&fit=crop&q=60"
                alt="Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 border-2 border-yellow-500"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
