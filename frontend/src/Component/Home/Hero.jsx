import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Preload critical text content immediately
    setIsLoading(false);
    
    // Preconnect to video domain for faster loading
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://assets.mixkit.co';
    document.head.appendChild(link);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Handle video loading
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    setIsLoading(false);
  };

  // Handle video loading errors
  const handleVideoError = () => {
    console.error("Video failed to load");
    setIsLoading(false);
    // Fallback to image if video fails
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.style.display = 'none';
    }
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, delay: 0.5 }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#D4AF37",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background with optimized loading */}
      <div className="absolute inset-0 w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
            <div className="animate-pulse rounded-full h-16 w-16 bg-gold-500/20"></div>
          </div>
        )}
        
        {/* Preload image for faster LCP */}
        <img
          src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Luxury fashion background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          style={{ display: isVideoLoaded ? 'none' : 'block' }}
          loading="eager"
        />
        
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-70"
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          style={{ display: !isVideoLoaded ? 'none' : 'block' }}
        >
          {/* Using a reliable video source with multiple formats */}
          <source src="video.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-closeup-of-a-female-model-in-a-wedding-dress-43785-large.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
        
        {/* Mute Button */}
        
      </div>

      {/* Content - Optimized for LCP */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* Preload critical text with priority */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-5xl font-bold text-white mb-4 font-serif"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: 'transform, opacity' }} // Hint to browser for optimization
        >
          Whatever Your Size,  <span className="text-yellow-400">Height, Preferred Style</span>
        </motion.h1>
        
        {/* LCP Element - Optimized with priority rendering */}
        <motion.p 
          className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl font-light"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ 
            willChange: 'transform, opacity',
            contentVisibility: 'auto' // Helps browser optimize rendering
          }}
        >
          Discover the exquisite craftsmanship of our luxury collections
        </motion.p>
        
        <motion.div 
  className="flex flex-col sm:flex-row gap-4"
  variants={textVariants}
  initial="hidden"
  animate="visible"
  transition={{ delay: 0.4 }}
>
 
  
  {/* Second button with Link */}
  <motion.div
    variants={buttonVariants}
    initial="hidden"
    animate="visible"
    whileHover="hover"
    whileTap="tap"
  >
    <Link to="/products">
      <button className="cursor-pointer bg-transparent border-2 border-white text-white px-8 py-3 rounded-sm font-semibold text-lg tracking-wider uppercase">
        Customization
      </button>
    </Link>
  </motion.div>
</motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Brand Stats - Loaded after main content */}
     
    </div>
  );
};

export default Hero;