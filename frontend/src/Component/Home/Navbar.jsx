import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // To read cart state
import { backendUrl } from "../../config/config";

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Redux cart
  const cartItems = useSelector((state) => state.cart.items); // assumes cartSlice has "items"
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${backendUrl}/api/dresses/categories`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        // Fallback to default categories if API fails
        setCategories([
          { name: "Dresses", slug: "dresses" },
          { name: "Tops", slug: "tops" },
          { name: "Bottoms", slug: "bottoms" },
          { name: "Jumpsuits", slug: "jumpsuits" },
          { name: "Coats", slug: "coats" },
          { name: "Bridesmaid", slug: "bridesmaid" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const navBackground = () => {
    if (mobileMenuOpen) return "bg-white shadow-lg";
    if (isScrolled || hovered) return "bg-white shadow-md";
    return "bg-transparent";
  };

  const textColor = () => {
    if (mobileMenuOpen) return "text-black";
    if (isScrolled || hovered) return "text-black";
    return "text-white";
  };

  // Navigation items - Home is static, others come from backend
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dresses", path: "/products" },
    ...categories.map(cat => ({
      name: cat.name,
      path: `/category/${cat.slug || cat.name.toLowerCase()}`
    }))
  ];

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

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
          {!loading && !error && (
            <ul className="hidden md:flex gap-6 text-sm font-medium items-center">
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

              {/* Cart Icon */}
              <li className="relative ml-4">
                <Link to="/cart" className="flex items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h12.4M7 13H5.4M17 21a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          )}

          {error && (
            <div className="hidden md:block text-sm text-red-500">
              Categories loading failed
            </div>
          )}

          {/* Mobile Icons (Cart + Hamburger) */}
          <div className="flex items-center md:hidden gap-4">
            {/* Cart Icon - Visible on mobile */}
            <Link to="/cart" className="relative flex items-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h12.4M7 13H5.4M17 21a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <motion.div
              className="flex flex-col space-y-1.5 cursor-pointer z-60"
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
                  >
                    <Link
                      to={item.path}
                      className={`${
                        location.pathname === item.path
                          ? "font-bold text-amber-700"
                          : "text-gray-800"
                      }`}
                      onClick={handleLinkClick}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Cart - Already visible in header, so optional here */}
                <motion.div 
                  className="w-full mr-10 text-center border-b border-gray-200 py-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link 
                    to="/cart" 
                    className="relative inline-flex items-center text-gray-800"
                    onClick={handleLinkClick}
                  >
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="ml-2 bg-yellow-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;