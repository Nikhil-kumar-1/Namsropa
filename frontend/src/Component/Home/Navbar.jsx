import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBackground = () => {
    if (mobileMenuOpen) return "bg-white shadow-lg";
    if (isScrolled || hovered) return "bg-white shadow-md";
    return "bg-transparent";
  };

  // Dynamic text color
  const textColor = () => {
    if (mobileMenuOpen) return "text-black";
    if (isScrolled || hovered) return "text-black";
    return "text-white";
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dresses", path: "/products" },
    { name: "Tops", path: "/fine-jewellery" },
    { name: "Bottoms", path: "/womenswear" },
    { name: "Jumpsuits", path: "/menswear" },
    { name: "Coats", path: "/weddings" },
    { name: "Bridesmaid", path: "/accessories" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-400 ${navBackground()} ${textColor()}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 uppercase tracking-wide">
          <motion.h1
            className={`text-2xl font-bold cursor-pointer ${textColor()}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">Nam's Ropa</Link>
          </motion.h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 text-sm font-medium">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                className="cursor-pointer relative"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  to={item.path}
                  className={`pb-1 ${
                    location.pathname === item.path
                      ? "border-b-2 border-current"
                      : "hover:border-b-2 hover:border-gray-400"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <motion.div
            className="md:hidden flex flex-col space-y-1.5 cursor-pointer z-60"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span
              className={`hamburger-line w-6 h-px transition-all ${
                textColor().includes("black") ? "bg-black" : "bg-white"
              } ${mobileMenuOpen ? "transform translate-y-2 rotate-45" : ""}`}
            ></span>
            <span
              className={`hamburger-line w-6 h-px transition-all ${
                textColor().includes("black") ? "bg-black" : "bg-white"
              } ${mobileMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`hamburger-line w-6 h-px transition-all ${
                textColor().includes("black") ? "bg-black" : "bg-white"
              } ${mobileMenuOpen ? "transform -translate-y-2 -rotate-45" : ""}`}
            ></span>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-menu fixed inset-0 bg-white/95 z-40 md:hidden pt-20"
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              <div className="flex flex-col items-center justify-start h-full space-y-6 text-xl px-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className="w-full text-center border-b border-gray-200 py-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? "font-bold text-amber-700"
                          : "text-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
