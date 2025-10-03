import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDesktopImageLoad = () => {
    setImageLoaded(true);
  };

  const handleMobileImageLoad = () => {
    setMobileImageLoaded(true);
  };

  const handleImageError = (imageType) => {
    console.error(`${imageType} image failed to load`);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.6 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  // Fallback images in case your images don't load
  const fallbackDesktopImage = "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
  const fallbackMobileImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <section className="relative w-full  h-200 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {isLoading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent mb-4"></div>
              <p className="text-yellow-400 font-serif">Loading...</p>
            </div>
          </div>
        )}

        {/* Desktop/Laptop Banner */}
        <img
          src="herobanner.jpeg"
          alt="Luxury fashion desktop background"
          className={`hidden md:block w-full h-full object-cover object-center transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleDesktopImageLoad}
          onError={() => handleImageError("Desktop")}
          onErrorCapture={(e) => {
            e.target.src = fallbackDesktopImage;
          }}
        />

        {/* Mobile Banner */}
        <img
          src="mobilebanner.jpeg"
          alt="Luxury fashion mobile background"
          className={`block md:hidden w-full h-full object-fit object-center transition-opacity duration-700 ${
            mobileImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleMobileImageLoad}
          onError={() => handleImageError("Mobile")}
          onErrorCapture={(e) => {
            e.target.src = fallbackMobileImage;
          }}
        />

        {/* Enhanced Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30 md:from-black/30 md:via-black/30 md:to-black/30"></div>
        
        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/10 to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh]"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-4xl lg:text-4xl font-bold text-white mb-4 md:mb-6 font-serif leading-tight"
            variants={textVariants}
          >
            Whatever Your
            <br />
            <span className="text-yellow-400 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text ">
              Size, Height, 
            </span>
            
            <span className="bg-gradient-to-r from-white via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
              Preferred Style
            </span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 md:mb-12 max-w-3xl md:max-w-4xl font-light leading-relaxed font-serif"
            variants={textVariants}
            transition={{ delay: 0.3 }}
          >
            Discover exquisite craftsmanship and perfect fit with our luxury
            custom dress collections tailored for every body type
          </motion.p>


          
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;