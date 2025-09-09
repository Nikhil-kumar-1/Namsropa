import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-5xl font-serif font-bold text-yellow-600 mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join the World of Nam's Ropa
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-gray-600 mb-10 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Be the first to know about new collections, exclusive campaigns, and
          insider stories.
        </motion.p>

        {/* Email Input + Button */}
        <motion.form
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 border border-gray-300 px-4 py-3 rounded-full focus:outline-none focus:border-yellow-500 text-gray-700"
            required
          />
          <button
            type="submit"
            className="px-8 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition duration-300"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;
