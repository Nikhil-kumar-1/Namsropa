import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, 
  FaShoppingBag, 
  FaHeart, 
  FaUser, 
  FaSearch,
  FaInstagram, 
  FaFacebookF, 
  FaPinterestP, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaChevronUp,
  FaChevronDown
} from "react-icons/fa";





const Footer = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [expandedSection, setExpandedSection] = useState(null);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Dresses", path: "/products", icon: <FaShoppingBag /> },
    { name: "Tops", path: "/category/tops", icon: <FaShoppingBag /> },
    { name: "Bottoms", path: "/category/bottoms", icon: <FaShoppingBag /> },
    { name: "Jumpsuits", path: "/category/jumpsuits", icon: <FaShoppingBag /> },
    { name: "Coats", path: "/category/coats", icon: <FaShoppingBag /> },
    { name: "Bridesmaid", path: "/category/bridesmaid", icon: <FaHeart /> },
  ];

  const policies = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    // { name: "Terms & Conditions", path: "/terms" },
    { name: "Return & Refund", path: "/returns" },
    { name: "Size-Chart", path: "/size-chart" },
    { name: "Payment & Shipping", path: "/payment-shipping" },
    { name: "Contact Us", path: "/contact" },
    { name: "Login", path: "/login" },
  ];

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail("");
    }
  };

  // Mobile Bottom Navigation Click
  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path); // Navigate to route
  };

  return (
    <footer className="bg-black text-gray-300 pt-12 pb-20 md:pb-12 relative overflow-hidden">
      {/* Animated Golden Line Top */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      ></motion.div>

      {/* Main Navigation Bar (Fixed at bottom on mobile) */}
      {/* Main Navigation Bar (Fixed at bottom on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
        <div className="flex justify-around py-3">
          {[
            { id: "home", icon: <FaHome />, label: "Home", path: "/" },
            { id: "shop", icon: <FaShoppingBag />, label: "Shop", path: "/products" },
            { id: "search", icon: <FaSearch />, label: "Search", path: "/search" },
            { id: "wishlist", icon: <FaHeart />, label: "Wishlist", path: "/cart" },
            { id: "account", icon: <FaUser />, label: "Account", path: "/login" },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center px-2 ${activeTab === item.id ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => handleTabClick(item)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        {/* Brand Section */}
        <div className="mb-10 text-center">
          <motion.h1
            className="text-3xl font-serif font-bold text-yellow-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Nam's Ropa
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-sm mb-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Crafted with heritage, designed for the modern world. Discover our
            collections inspired by timeless elegance.
          </motion.p>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center space-x-6 text-lg mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {[
              { icon: <FaInstagram />, rotate: 10 },
              { icon: <FaFacebookF />, rotate: -10 },
              { icon: <FaPinterestP />, rotate: 10 }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="hover:text-yellow-500 transition p-2 rounded-full bg-gray-900"
                whileHover={{ scale: 1.2, rotate: social.rotate }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Mobile Accordion Sections */}
        <div className="md:hidden space-y-4">
          {/* Quick Links Accordion */}
          <div className="border-b border-gray-800 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left py-2"
              onClick={() => toggleSection('quickLinks')}
            >
              <h2 className="text-lg font-semibold text-yellow-500">Shop Categories</h2>
              {expandedSection === 'quickLinks' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <AnimatePresence>
              {expandedSection === 'quickLinks' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pt-3 space-y-2">
                    {quickLinks.map((link, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className="hover:text-yellow-500 transition flex items-center py-1"
                        >
                          <span className="mr-2 text-yellow-500">{link.icon}</span>
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Policies Accordion */}
          <div className="border-b border-gray-800 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left py-2"
              onClick={() => toggleSection('policies')}
            >
              <h2 className="text-lg font-semibold text-yellow-500">Customer Care</h2>
              {expandedSection === 'policies' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <AnimatePresence>
              {expandedSection === 'policies' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="pt-3 space-y-2">
                    {policies.map((link, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          className="hover:text-yellow-500 transition flex items-center py-1"
                        >
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Information */}
          <div className="border-b border-gray-800 pb-3">
            <button 
              className="flex justify-between items-center w-full text-left py-2"
              onClick={() => toggleSection('contact')}
            >
              <h2 className="text-lg font-semibold text-yellow-500">Contact Us</h2>
              {expandedSection === 'contact' ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <AnimatePresence>
              {expandedSection === 'contact' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-4">
                    <div className="flex items-start">
                      <div className="text-yellow-500 mr-3 mt-1">
                        <FaPhone className="text-sm" />
                      </div>
                      <div>
                        <p className="font-medium">+1 (555) 123-4567</p>
                        <p className="text-gray-400 text-xs">Mon-Fri, 9AM-5PM</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="text-yellow-500 mr-3 mt-1">
                        <FaEnvelope className="text-sm" />
                      </div>
                      <div>
                        <p className="font-medium">info@namsropa.com</p>
                        <p className="text-gray-400 text-xs">We respond within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="text-yellow-500 mr-3 mt-1">
                        <FaMapMarkerAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="font-medium">123 Fashion Avenue</p>
                        <p className="text-gray-400 text-xs">New York, NY 10001</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Layout (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-semibold text-yellow-500 mb-5 pb-2 border-b border-gray-800">
              Shop Categories
            </h2>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="transition-all"
                >
                  <Link
                    to={link.path}
                    className="hover:text-yellow-500 transition flex items-center py-2 group"
                  >
                    <span className="text-yellow-500 mr-3 opacity-70 group-hover:opacity-100 transition-opacity">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-semibold text-yellow-500 mb-5 pb-2 border-b border-gray-800">
              Customer Care
            </h2>
            <ul className="space-y-3">
              {policies.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: -5 }}
                  className="transition-all"
                >
                  <Link
                    to={link.path}
                    className="hover:text-yellow-500 transition flex items-center py-2 group"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 opacity-70 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.name}</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-semibold text-yellow-500 mb-5 pb-2 border-b border-gray-800">
              Contact & Newsletter
            </h2>
            
            <div className="space-y-5 mb-6">
              <div className="flex items-start">
                <div className="text-yellow-500 mr-3 mt-1">
                  <FaPhone className="text-sm" />
                </div>
                <div>
                  <p className="font-medium">+1 (555) 123-4567</p>
                  <p className="text-gray-400 text-xs">Mon-Fri, 9AM-5PM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-yellow-500 mr-3 mt-1">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="font-medium">info@namsropa.com</p>
                  <p className="text-gray-400 text-xs">We respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-yellow-500 mr-3 mt-1">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <p className="font-medium">123 Fashion Avenue</p>
                  <p className="text-gray-400 text-xs">New York, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-yellow-500 mb-3">Subscribe to Our Newsletter</h3>
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className="bg-gray-800 text-white text-sm py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <motion.button 
                  type="submit"
                  className="bg-yellow-500 text-black text-sm font-medium py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div>© {new Date().getFullYear()} Nam's Ropa. All Rights Reserved.</div>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="mr-2 text-xs">Secure payments with</span>
            <div className="flex space-x-2">
              {['Visa', 'MC', 'PP'].map((payment, index) => (
                <motion.div 
                  key={index}
                  className="w-6 h-4 bg-gray-700 rounded-sm flex items-center justify-center text-[10px]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {payment}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;