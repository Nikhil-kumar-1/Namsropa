import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaPaperPlane,
  FaClock,
  FaUser,
  FaComment,
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Image */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-70"></div>
        </div>

        <motion.div
          className="relative z-10 text-center px-5 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif tracking-wide">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-yellow-600 max-w-2xl mx-auto mb-8">
            Have questions about our collections or need assistance? We'd love
            to hear from you.
          </p>
          <motion.div
            className="w-24 h-1 bg-yellow-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-yellow-500 opacity-20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-16 w-12 h-12 border border-yellow-500 opacity-30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear",
          }}
        />
      </section>

      {/* Contact Content */}
      <section className="py-16 px-5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-yellow-500 pb-3">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Your Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-500">
                    <FaUser className="text-sm" />
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-500">
                    <FaEnvelope className="text-sm" />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Your Message
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-yellow-500">
                    <FaComment className="text-sm" />
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full bg-gray-900 text-white border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-yellow-500 text-black font-medium py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:bg-yellow-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Send Message</span>
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 border-b border-yellow-500 pb-3">
                Contact Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-start p-4 bg-gray-900 rounded-lg">
                  <div className="text-yellow-500 mr-4 mt-1">
                    <FaPhone className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Phone</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-400 text-sm">Mon-Fri, 9AM-5PM</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-900 rounded-lg">
                  <div className="text-yellow-500 mr-4 mt-1">
                    <FaEnvelope className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">Email</h3>
                    <p className="text-gray-300">info@namsropa.com</p>
                    <p className="text-gray-400 text-sm">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-900 rounded-lg">
                  <div className="text-yellow-500 mr-4 mt-1">
                    <FaMapMarkerAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      Store Location
                    </h3>
                    <p className="text-gray-300">123 Fashion Avenue</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gray-900 rounded-lg">
                  <div className="text-yellow-500 mr-4 mt-1">
                    <FaClock className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      Opening Hours
                    </h3>
                    <p className="text-gray-300">Monday-Friday: 9am - 8pm</p>
                    <p className="text-gray-300">Saturday-Sunday: 10am - 6pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#eab308",
                    color: "#000",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#eab308",
                    color: "#000",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebookF />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#eab308",
                    color: "#000",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaPinterestP />
                </motion.a>
              </div>
            </div>

            {/* Map */}
            <div className="pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Find Us</h3>
              <div className="rounded-lg overflow-hidden border border-gray-800 h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304613!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1643037039366!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(50%) invert(92%) contrast(83%)",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nam's Ropa Location"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Decorative Bottom Section */}
      <motion.div
        className="py-16 px-5 bg-gray-900 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Visit Our Store
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Experience the elegance of our collections in person. Our
            knowledgeable staff will help you find the perfect piece.
          </p>
          <motion.button
            className="bg-yellow-500 text-black font-medium py-3 px-8 rounded-lg text-lg"
            whileHover={{ scale: 1.05, backgroundColor: "#eab308" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Directions
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
