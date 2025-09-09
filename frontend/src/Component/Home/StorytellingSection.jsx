import React from "react";
import { motion } from "framer-motion";

const StorytellingSection = () => {
  return (
    <section className="relative w-full h-[110vh] bg-black overflow-hidden">
      {/* Background Parallax Image */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1662407439001-749f5254afae?w=1200&auto=format&fit=crop&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-serif font-bold text-yellow-500 mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          EVERY DETAIL MATTERS
        </motion.h2>

        {/* First Paragraph */}
        <motion.p
          className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          It is also about sustainability as there is no waste either at our end
          or yours. We don’t have any clothes left over at the end of the season
          as we only make what the customer orders. And you are more likely to
          find clothes that meet your size, height and style requirements and
          hence will have nothing that hangs unused in your closet.
        </motion.p>

        {/* Culture Paragraph */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 italic"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="font-semibold text-yellow-500">Culture — </span>
          Being not just customer-centered but customer-led is at the core of
          Nam’s Ropa’s culture of innovation. Our customers participate in the
          design so that they get what suits them. They can change neckline,
          sleeve and length, add or remove pockets and get clothes made to their
          exact size and height.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="cursor-pointer px-10 py-3 border-2 border-yellow-500 text-yellow-500 font-medium tracking-wide rounded-full hover:bg-yellow-500 hover:text-black transition duration-300"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          Learn More
        </motion.button>
      </div>
    </section>
  );
};

export default StorytellingSection;
