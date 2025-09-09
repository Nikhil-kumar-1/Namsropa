import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaFacebookF, FaPinterestP, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Dresses", path: "/dresses" },
    { name: "Tops", path: "/tops" },
    { name: "Bottoms", path: "/bottoms" },
    { name: "Jumpsuits", path: "/jumpsuits" },
    { name: "Coats", path: "/coats" },
    { name: "Bridesmaid", path: "/bridesmaid" },
  ];

  const policies = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Return & Exchange", path: "/returns" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="bg-black text-gray-300 py-16 relative overflow-hidden">
      {/* Animated Golden Line Top */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <motion.h1
            className="text-2xl font-serif font-bold text-yellow-500 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Nam's Ropa
          </motion.h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Crafted with heritage, designed for the modern world. Discover our
            collections inspired by timeless elegance.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-6 text-lg mb-8">
            <motion.a
              href="#"
              className="hover:text-yellow-500 transition"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-yellow-500 transition"
              whileHover={{ scale: 1.2, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-yellow-500 transition"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPinterestP />
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">
            Quick Links
          </h2>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={link.path}
                  className="hover:text-yellow-500 transition flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">
            Customer Care
          </h2>
          <ul className="space-y-3 text-sm">
            {policies.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={link.path}
                  className="hover:text-yellow-500 transition flex items-center"
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-500 mb-4">
            Contact Us
          </h2>
          <div className="space-y-4 text-sm">
            <motion.div 
              className="flex items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-500 mr-3 mt-1">
                <FaPhone className="text-sm" />
              </div>
              <div>
                <p className="font-medium">+1 (555) 123-4567</p>
                <p className="text-gray-400 text-xs">Mon-Fri, 9AM-5PM</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-500 mr-3 mt-1">
                <FaEnvelope className="text-sm" />
              </div>
              <div>
                <p className="font-medium">info@namsropa.com</p>
                <p className="text-gray-400 text-xs">We respond within 24 hours</p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-500 mr-3 mt-1">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="font-medium">123 Fashion Avenue</p>
                <p className="text-gray-400 text-xs">New York, NY 10001</p>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-yellow-500 mb-2">Subscribe to Our Newsletter</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 text-white text-xs py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
              <button className="bg-yellow-500 text-black text-xs font-medium py-2 px-4 hover:bg-yellow-600 transition-colors">
                Join
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div>© {new Date().getFullYear()} Nam's Ropa. All Rights Reserved.</div>
        <div className="flex items-center mt-2 md:mt-0">
          <span className="mr-2">Secure payments with</span>
          <div className="flex space-x-2">
            <div className="w-8 h-5 bg-gray-700 rounded-sm flex items-center justify-center text-xs">Visa</div>
            <div className="w-8 h-5 bg-gray-700 rounded-sm flex items-center justify-center text-xs">MC</div>
            <div className="w-8 h-5 bg-gray-700 rounded-sm flex items-center justify-center text-xs">PP</div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;