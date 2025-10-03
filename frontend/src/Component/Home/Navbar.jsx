import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { backendUrl } from "../../config/config";
import { logout } from "../../authSlice";

const Navbar = () => {
  const [hovered, setHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux states
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const authState = useSelector((state) => state.auth || {});
  const { user, isAuthenticated } = authState || {};

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownOpen]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/api/dresses/categories`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setCategories([
          { name: "Dresses", slug: "dresses" },
          { name: "Tops", slug: "tops" },
          { name: "Bottoms", slug: "bottoms" },
          { name: "Jumpsuits", slug: "jumpsuits" },
          { name: "Coats", slug: "coats" },
          { name: "Bridesmaid", slug: "bridesmaid" },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  const navBackground = () => {
    if (mobileMenuOpen) return "bg-white shadow-lg";
    if (isScrolled || hovered) return "bg-white shadow-md";
    return "bg-transparent";
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dresses", path: "/products" },
    ...categories.map((cat) => ({
      name: cat.name,
      path: `/category/${cat.slug || cat.name.toLowerCase()}`,
    })),
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <motion.nav
      className={`top-0 w-full z-50 transition-all duration-400 ${navBackground()} text-black`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 uppercase tracking-wide">
        {/* Logo */}
       <motion.div
  className="cursor-pointer flex items-center h-16" // fixed navbar height
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <Link to="/" className="flex items-center h-full">
    <img 
      src="Logo.jpeg" 
      alt="Nam's Ropa Logo" 
      className="h-20 mb-5 w-auto object-contain" 
    />
  </Link>
</motion.div>


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

            {/* Wishlist */}
            <motion.li 
              className="relative ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/wishlist" className="flex items-center p-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </motion.li>

            {/* Cart */}
            <motion.li 
              className="relative ml-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link to="/cart" className="flex items-center p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </motion.li>

            {/* Auth/Profile */}
            {isAuthenticated ? (
              <li className="relative profile-dropdown ml-4">
                <motion.div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-black">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <span className="text-sm">{user?.name || "User"}</span>
                </motion.div>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        My Wishlist
                      </Link>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <motion.li className="cursor-pointer ml-4" whileHover={{ y: -2 }}>
                <Link
                  to="/signup"
                  className={`pb-1 ${
                    location.pathname === "/signup"
                      ? "border-b-2 border-current"
                      : "hover:border-b-2 hover:border-gray-400"
                  }`}
                >
                  Sign Up
                </Link>
              </motion.li>
            )}
          </ul>
        )}

        {/* Mobile Icons + Hamburger */}
        <div className="flex items-center md:hidden gap-4">
          {/* Wishlist Icon */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/wishlist" className="flex items-center p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </motion.div>

          {/* Cart Icon */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/cart" className="flex items-center p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </motion.div>

          {/* Hamburger Menu */}
          <motion.div
            className="flex flex-col space-y-1.5 cursor-pointer z-60 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span 
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-black transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 md:hidden pt-20 overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              {/* User Info Section */}
              {isAuthenticated && (
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                      ) : (
                        <span className="text-lg font-bold text-black">
                          {user?.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user?.name || "User"}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <div className="flex-1 px-6 py-4">
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all ${
                          location.pathname === item.path
                            ? "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={handleLinkClick}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Auth Links */}
                <div className="border-t border-gray-200 mt-6 pt-6">
                  {isAuthenticated ? (
                    <div className="space-y-1">
                      <Link
                        to="/profile"
                        className="block py-3 px-4 rounded-lg text-lg text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleLinkClick}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block py-3 px-4 rounded-lg text-lg text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleLinkClick}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block py-3 px-4 rounded-lg text-lg text-gray-700 hover:bg-gray-100 transition-all"
                        onClick={handleLinkClick}
                      >
                        My Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-3 px-4 rounded-lg text-lg text-red-600 hover:bg-red-50 transition-all"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/signup"
                      className="block py-3 px-4 rounded-lg text-lg bg-black text-white text-center font-semibold hover:bg-gray-800 transition-all"
                      onClick={handleLinkClick}
                    >
                      Sign Up / Login
                    </Link>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="p-6 border-t border-gray-200">
                <motion.button
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  Close Menu
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;