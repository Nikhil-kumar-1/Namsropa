import React from "react";
import { motion } from "framer-motion";

const SizeChart = () => {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Hero Section */}
      <div
        className="relative h-[50vh] flex items-center justify-center bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <motion.div
          className="relative z-10 text-center px-4 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-serif">
            NamsRopa Size & Fit Guide
          </h1>
          <p className="text-yellow-400 text-lg md:text-xl max-w-2xl mx-auto">
            Design your perfect fit and feel confident in every outfit
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* Intro Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm"
        >
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 border-yellow-500 pb-2 inline-block">
            Design Your Perfect Fit
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              It's easy to get the perfect fit and customize any item that catches your eye at NamsRopa. From hemlines to necklines to sleeves, get your favorite outfits customized the way you like. The customization fee for tops is <span className="font-semibold text-yellow-700">$6.95</span>, bottoms is <span className="font-semibold text-yellow-700">$8.95</span>, while that of dresses, jumpsuits, coats & jackets is <span className="font-semibold text-yellow-700">$14.95</span>.
            </p>
            
            <p className="text-lg leading-relaxed">
              Our size and fit guide will help you to get the right measurements for a great fit with your made-to-order item that makes you look and feel your best.
            </p>
            
            <p className="text-lg leading-relaxed">
              NamsRopa offers the broadest size range available (XS to 6X) for every outfit we have. Choose from our standard sizes or get your outfits made to your exact measurements.
            </p>
          </div>
        </motion.section>

        {/* Size Table */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-50 p-6 rounded-xl shadow-sm"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-500 pb-2 inline-block">
            Size Chart
          </h2>
          
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border-collapse text-gray-800">
              <thead>
                <tr className="bg-yellow-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">SIZE</th>
                  <th className="px-4 py-3 font-semibold">XS</th>
                  <th className="px-4 py-3 font-semibold">S</th>
                  <th className="px-4 py-3 font-semibold">M</th>
                  <th className="px-4 py-3 font-semibold">L</th>
                  <th className="px-4 py-3 font-semibold">XL</th>
                  <th className="px-4 py-3 font-semibold">1X</th>
                  <th className="px-4 py-3 font-semibold">2X</th>
                  <th className="px-4 py-3 font-semibold">3X</th>
                  <th className="px-4 py-3 font-semibold">4X</th>
                  <th className="px-4 py-3 font-semibold">5X</th>
                  <th className="px-4 py-3 font-semibold">6X</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white even:bg-gray-100">
                  <td className="px-4 py-3 font-semibold border-b border-gray-200">0</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">2</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">4</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">6</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">8</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">10</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">12</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">14</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">16</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">18</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">16W</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">18W</td>
                </tr>
                <tr className="bg-white even:bg-gray-100">
                  <td className="px-4 py-3 font-semibold border-b border-gray-200">Bust (inches)</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">32</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">33</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">34</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">35</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">36</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">37</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">38.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">40</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">41.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">43.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">43</td>
                </tr>
                <tr className="bg-white even:bg-gray-100">
                  <td className="px-4 py-3 font-semibold border-b border-gray-200">Natural Waist (inches)</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">25</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">26</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">27</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">28</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">29</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">30</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">31.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">33</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">34.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">36.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">36</td>
                </tr>
                <tr className="bg-white even:bg-gray-100">
                  <td className="px-4 py-3 font-semibold border-b border-gray-200">Hip (inches)</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">35</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">36</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">37</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">38</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">39</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">40</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">41.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">43</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">44.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">46.5</td>
                  <td className="px-4 py-3 text-center border-b border-gray-200">46</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Custom Measurements */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-50 p-8 rounded-xl shadow-sm"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-500 pb-2 inline-block">
            Providing Custom Measurements
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              When you choose your item, you'll have the option to enter your body measurements. We recommend that you do not round your measurements up or down to adjust your fit. Our team understands the cut and pattern of our styles inside and out, so you'll always get the best results if you provide your exact measurements as they are.
            </p>
            
            <p className="text-lg leading-relaxed">
              We also welcome an email from you with any special sizing or styling instructions for your order.
            </p>
          </div>
        </motion.section>

        {/* Measurement Instructions */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-50 p-8 rounded-xl shadow-sm"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-500 pb-2 inline-block">
            How to Measure Yourself
          </h2>
          
          <p className="text-gray-600 italic mb-6">(Write down the measurements in inches)</p>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Instructions */}
            <div className="lg:w-1/2">
              <p className="text-lg text-gray-700 mb-6">
                Whether you choose standard sizing or custom measurements, follow these instructions for the perfect fit.
                Measure over the undergarments you plan to wear. Keep the tape level, close but not tight. A friend helping is more accurate!
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-inner max-h-[500px] overflow-y-auto">
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Shoulder: Standing upright measure across your upper back from the tip of one shoulder to the tip of the other.",
                    "Chest: Measure all the way around your torso just above your bust.",
                    "Bust: Wearing your usual bra, with arms relaxed at your sides, measure your bust at the fullest point.",
                    "Under-bust: Measure all the way around your torso just beneath your bust.",
                    "Wearing Waist: Measure all the way around your waist where you usually wear your pants.",
                    "Natural Waist: Measure around the narrowest part of your waistline, just below your ribcage (There will usually be a crease here when you bend to one side).",
                    "Length of Arm: Stand straight and measure all the way from Shoulder tip to the wrist. It might be helpful to ask someone to help with this measurement!",
                    "Upper Arm: Measure all the way around the widest part of your upper arm (bicep). Keep your elbow bent while measuring.",
                    "Hips: Standing with heels together, measure around your body at the broadest part of your hips (approximately 8 inches below your natural waistline).",
                    "Total Rise: Standing upright, place the measuring tape at the centre of your back at your natural waist. Keeping the tape in place, pass it between your legs, measuring all the way up front to the middle of your natural waist. Be sure the tape is not too tight or too loose.",
                    "Hip at Crotch: Measure all the way around your body at your lower hip, where it meets the thighs.",
                    "Thigh: Measure around the fullest part of one thigh.",
                    "Calf: Measure around the fullest part of one calf.",
                    "Inseam: Measure the length of your inner leg all the way from your crotch to your ankle.",
                    "Outseam: Measure straight from your wearing waistline to your ankle.",
                    "HPS to Bust Point: Start where your shoulder meets your neck. Measure down along the front of your body to the apex of your bust.",
                    "HPS to Waist: Start where your shoulder meets your neck. Measure along the curve of your front, down to your natural waistline.",
                    "HPS to Knee: Start where your shoulder meets your neck. Measure along the curve of your front to your natural waistline, and down to your knee."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Image */}
            <div className="lg:w-1/2 flex justify-center items-start">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src="sizechart.jpg"
                  alt="Measuring guide illustration showing how to take body measurements"
                  className="w-full max-w-md object-contain rounded"
                />
                <p className="text-center text-sm text-gray-500 mt-2 italic">
                  Illustration showing proper measuring techniques
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-yellow-50 p-8 rounded-xl border border-yellow-200"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-yellow-500 pb-2 inline-block">
            Get Help With Your Order
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              Call toll-free: <span className="font-semibold text-yellow-700">1 (855) NAMSROPA (626-7767)</span>
            </p>
            <p className="text-lg">Mon-Fri, 8 am - 4 pm PST</p>
            <p className="text-lg">
              Or email us: <span className="font-semibold text-yellow-700">support@namsropa.com</span>
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default SizeChart;