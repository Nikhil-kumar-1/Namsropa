import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import aboutBaner from "../../assets/About-banner.avif";
import craftmanshipImg from "../../assets/craftmanship.avif";
import aboutCraft from "../../assets/about-craft.avif";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('heritage');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  
  // Values data
  const values = [
    {
      title: "Craftsmanship",
      description: "Every piece is meticulously crafted by skilled artisans using time-honored techniques.",
      icon: "✨"
    },
    {
      title: "Sustainability",
      description: "We prioritize ethical sourcing and sustainable practices in all our creations.",
      icon: "🌿"
    },
    {
      title: "Innovation",
      description: "Blending traditional techniques with contemporary design innovation.",
      icon: "🔮"
    },
    {
      title: "Heritage",
      description: "Honoring cultural heritage while creating designs for the modern world.",
      icon: "🏛️"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={ref}>
      <Helmet>
  {/* Basic SEO */}
  <title>About Us - Nam's Ropa</title>
  <meta 
    name="description" 
    content="Discover the heritage, craftsmanship, and values that define Nam's Ropa. Where tradition meets contemporary elegance." 
  />
  <meta 
    name="keywords" 
    content="Nam's Ropa, About Nam's Ropa, Nam's Ropa heritage, Nam's Ropa story, Nam's Ropa values, clothing brand, sustainable fashion" 
  />
  <meta name="author" content="Nam's Ropa" />
  <meta name="robots" content="index, follow" />
  <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="language" content="English" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://namsropa.com/about" />

  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://namsropa.com/about" />
  <meta property="og:title" content="About Us - Nam's Ropa" />
  <meta 
    property="og:description" 
    content="Learn about Nam's Ropa — where timeless tradition blends seamlessly with modern fashion, creating sustainable and elegant clothing." 
  />
  <meta property="og:site_name" content="Nam's Ropa" />

  {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://namsropa.com/about" />
  <meta name="twitter:title" content="About Us - Nam's Ropa" />
  <meta 
    name="twitter:description" 
    content="Explore Nam's Ropa's heritage, values, and craftsmanship. A fashion brand where tradition meets modern elegance." 
  />
  <meta name="twitter:image" content="https://namsropa.com/assets/About-banner.avif" />

  {/* Favicon */}
  <link rel="icon" href="https://namsropa.com/favicon.ico" type="image/x-icon" />
  <link rel="apple-touch-icon" href="https://namsropa.com/apple-touch-icon.png" />

  {/* Structured Data (JSON-LD for About Page) */}
  <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "url": "https://namsropa.com/about",
      "name": "About Us - Nam's Ropa",
      "description": "Discover the heritage, craftsmanship, and values that define Nam's Ropa. Where tradition meets contemporary elegance.",
      "publisher": {
        "@type": "Organization",
        "name": "Nam's Ropa",
        "logo": {
          "@type": "ImageObject",
          "url": "https://namsropa.com/Logo.png"
        }
      }
    }
    `}
  </script>
</Helmet>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${aboutBaner})`,
            y: backgroundY
          }}
        ></motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-1"></div>
        
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ y: textY }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Where heritage craftsmanship meets contemporary elegance
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-amber-400 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.7, duration: 0.8 }}
          ></motion.div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      

      {/* Heritage Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Heritage</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Founded in 2001, our maison has redefined luxury fashion through a unique blend of traditional 
                craftsmanship and contemporary design. Each piece tells a story of cultural heritage, meticulous 
                artistry, and innovative vision.
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our designs are created by master artisans who employ time-honored techniques passed down through 
                generations, ensuring that every garment is not just clothing, but a wearable piece of art.
              </p>
              <Link to="/size-chart">
              <motion.button 
                className="border cursor-pointer border-amber-400 text-amber-400 px-8 py-3 hover:bg-amber-400 hover:text-black transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Our Process
              </motion.button></Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <motion.div 
                className="aspect-square bg-gray-800 rounded-lg overflow-hidden"
                whileHover={{ rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={craftmanshipImg}
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-amber-400 z-10"
                initial={{ opacity: 0, x: -20, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide every stitch, every design, and every collection we create
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-black p-8 border border-gray-800 hover:border-amber-400 transition-colors duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="text-3xl mb-4"
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >{value.icon}</motion.div>
                <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-amber-400 transition-colors">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
<section className="relative py-20 px-4 bg-gray-900 overflow-hidden">
  {/* Background Image */}
  <motion.div
    className="absolute inset-0"
    style={{
      backgroundImage:`url(${aboutCraft})`,
        
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 0.6 }}
  ></motion.div>

  {/* Overlay for better text readability */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
        Experience Our Craftsmanship
      </h2>
      <p className="text-gray-200 mb-10 max-w-2xl mx-auto">
        Discover the artistry and passion behind each of our creations in our exclusive collections
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/products">
        <motion.button
          className="cursor-pointer bg-amber-400 text-black px-8 py-4 font-medium hover:bg-amber-500 transition-colors rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Collections
        </motion.button></Link>

       <Link to="/contact"><motion.button
          className="cursor-pointer border border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-colors rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
        </motion.button></Link> 
      </div>
    </motion.div>
  </div>
</section>

    </div>
  );
};

export default AboutPage;