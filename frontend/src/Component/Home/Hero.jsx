import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.error("Hero image failed to load");
    setIsLoading(false);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.5 },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#D4AF37",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="relative w-full min-h-screen pt-30 pb-30 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
            <div className="animate-pulse rounded-full h-10 w-16 bg-yellow-500/20"></div>
          </div>
        )}

        <img
          src="herobanner.jpeg"
          alt="Luxury fashion background"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-90" : "opacity-0"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-[calc(100vh-80px)] text-center px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Whatever Your Size,
          <br />
          <span className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text ">
            Height, Preferred Style
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-2xl lg:text-3xl text-white mb-8 max-w-4xl font-light leading-relaxed"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Discover exquisite craftsmanship and perfect fit with our luxury
          custom dress collections
        </motion.p>

        
      </div>
    </section>
  );
};

export default Hero;
