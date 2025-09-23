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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden" ref={ref}>
      <Helmet>
        <title>About Us - Nam's Ropa</title>
        <meta 
          name="description" 
          content="Discover Nam's Ropa - a distinctive luxury brand founded by Mallik N. in 2001, revitalizing antique textiles into contemporary masterpieces with sustainable practices." 
        />
        <meta name="keywords" content="Nam's Ropa, luxury brand, antique textiles, sustainable fashion, customized clothing" />
        <link rel="canonical" href="https://namsropa.com/about" />
      </Helmet>

      {/* Hero Section */}
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
            Revitalizing antique textiles into contemporary masterpieces since 2001
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-amber-400 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.7, duration: 0.8 }}
          ></motion.div>
        </motion.div>
      </section>

      {/* About Nam's Ropa Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">About Nam's Ropa</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <strong>Nam's Ropa is a distinctive luxury brand founded by Mallik N. in 2001.</strong> This avant-garde label 
                ingeniously revitalizes antique textiles and relics, seamlessly weaving them into contemporary and modern masterpieces.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                It is also about sustainability as there is no waste either at our end or yours. We don't have any clothes 
                left over at the end of the season as we only make what the customer orders. And you are more likely to find 
                clothes that meet your size, height and style requirements and hence will have nothing that hangs unused in your closet.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="aspect-square bg-gray-800 rounded-lg overflow-hidden"
                whileHover={{ rotate: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={craftmanshipImg}
                  alt="Nam's Ropa Craftsmanship" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Nam's Ropa Means to the Customer */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">What Nam's Ropa Means to the Customer</h2>
          </motion.div>
          
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              <strong>Customers say three things most often about Nam's Ropa:</strong> they feel confident in clothes made to their size, 
              height and style, they get a lot of compliments and they feel feminine!
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              When you buy new clothes, you expect them to make you look your best. But if the size, height or styling does not suit you, 
              that hope and expectation is not met. That is the difference that Nam's Ropa makes.
            </p>
          </motion.div>

          {/* Brand Choices */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold mb-6">Our Family of Brands</h3>
            <p className="text-gray-300 mb-8">
              At Nam's Ropa you have a choice of brands – Nam's Ropa itself and then:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { name: "Linea", description: "Contemporary" },
                { name: "Serapha", description: "Boho" },
                { name: "Stryke", description: "High Street Fashion" },
                { name: "Pairahan", description: "Men's Ethnic Wear" }
              ].map((brand, index) => (
                <motion.div 
                  key={index}
                  className="bg-black p-6 border border-gray-800 hover:border-amber-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="font-bold text-lg mb-2">{brand.name}</h4>
                  <p className="text-gray-400 text-sm">{brand.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Employee Well-Being Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Employee Well-Being</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-300 mb-6 leading-relaxed">
                <strong>Nam's Ropa is committed to the health, well-being, and ethical treatment of all our employees worldwide.</strong> 
                We have offices in both India & the United States. Our backend operations including manufacturing are done in India.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Nam's Ropa is fully compliant and wholeheartedly supports India's labor laws which include, but are not limited to, 
                protection for all workers (working conditions, compensation, regulation of working hours, etc.), special protection 
                for women (safety, comfort, etc.) and prohibition of child labor.
              </p>
              
              <div className="bg-amber-950/30 p-6 border-l-4 border-amber-400 mb-6">
                <h3 className="font-bold text-lg mb-3">Our Key Labor Policies</h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Full compliance with all Indian national laws including labor and environmental protection</li>
                  <li>• Compliance with stricter norms set by private equity and venture capital investors</li>
                  <li>• Health and life insurance for all employees</li>
                  <li>• Paid sick leave for all workers</li>
                  <li>• Lifetime pension plan for employees and their spouse</li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">COVID-19 Safety Measures</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                We implemented and enforced COVID-19 safety protocols at the beginning of the pandemic in 2020 including: 
                social distancing, mandatory masking, temperature checks, and hand-sanitization practices.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We continue to enforce these safety practices because of which we have only encountered a few positive cases 
                till now and are operating at full capacity.
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "📏", text: "Social Distancing" },
                  { icon: "😷", text: "Mandatory Masking" },
                  { icon: "🌡️", text: "Temperature Checks" },
                  { icon: "🧴", text: "Hand Sanitization" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="bg-gray-900 p-4 text-center rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-sm">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Culture</h2>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                <strong>Being not just customer-centered but customer-led is at the core of Nam's Ropa's culture of innovation.</strong>
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                And our customers participate in the design so that they get what suits them. They can change neckline, sleeve and length, 
                add or remove pockets and get clothes made to their exact size and height.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4 text-amber-400">Customization Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Neckline customization",
                    "Sleeve adjustments",
                    "Length modifications",
                    "Pocket options",
                    "Exact size fitting",
                    "Height-specific tailoring"
                  ].map((option, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center space-x-2"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{option}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div 
                className="bg-black p-8 border border-amber-400 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold mb-4 text-amber-400">Customer-Led Innovation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Participatory Design</h4>
                    <p className="text-gray-400 text-sm">Customers actively participate in creating their perfect garments</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Zero Compromise Fit</h4>
                    <p className="text-gray-400 text-sm">Every piece made to exact measurements and preferences</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Sustainable Choice</h4>
                    <p className="text-gray-400 text-sm">Made-to-order eliminates waste and unused inventory</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Summary Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Core Values</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Sustainability",
                description: "No waste at our end or yours through made-to-order production",
                icon: "🌱"
              },
              {
                title: "Customer-Led Design",
                description: "Customers participate in creating their perfect garments",
                icon: "✨"
              },
              {
                title: "Ethical Production",
                description: "Full compliance with labor laws and employee well-being",
                icon: "🤝"
              },
              {
                title: "Heritage Revival",
                description: "Transforming antique textiles into contemporary masterpieces",
                icon: "🏺"
              },
              {
                title: "Perfect Fit",
                description: "Clothes made to exact size, height and style requirements",
                icon: "📏"
              },
              {
                title: "Quality Craftsmanship",
                description: "Avant-garde label creating modern masterpieces since 2001",
                icon: "🎨"
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 bg-gray-900 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${aboutCraft})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0.6 }}
        ></motion.div>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Experience Nam's Ropa?
            </h2>
            <p className="text-gray-200 mb-10 max-w-2xl mx-auto text-lg">
              Join us in creating sustainable, personalized fashion that celebrates heritage while embracing innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <motion.button
                  className="cursor-pointer bg-amber-400 text-black px-8 py-4 font-medium hover:bg-amber-500 transition-colors rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Customizing
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  className="cursor-pointer border border-white text-white px-8 py-4 hover:bg-white hover:text-black transition-colors rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;