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
  // Redux states
const cartItems = useSelector((state) => state.cart?.items || []);
const wishlistItems = useSelector((state) => state.wishlist?.items || []);
const authState = useSelector((state) => state.auth || {});

  
  console.log("Auth State in Navbar:", authState);

  const { user, isAuthenticated } = authState || {};

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length; // Wishlist item count

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

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
  return "text-black";
};


  const handleLogout = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Dresses", path: "/products" },
    ...categories.map(cat => ({
      name: cat.name,
      path: `/category/${cat.slug || cat.name.toLowerCase()}`
    }))
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`top-0 w-full z-50 transition-all duration-400 ${navBackground()} ${textColor()}`}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 uppercase tracking-wide">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/">
              <img src="Logo.png" alt="Nam's Ropa Logo" className="h-10 bg-white w-auto" />
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

              {/* Wishlist Icon */}
              <li className="relative ml-2">
                <Link to="/wishlist" className="flex items-center">
                  <svg
                    className="w-5 h-5"
                    fill={wishlistCount > 0 ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* Cart Icon */}
              <li className="relative ml-2">
                <Link to="/cart" className="flex items-center">
                  <svg
                    className="w-5 h-5"
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
                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* Authentication Links / Profile Dropdown */}
              {isAuthenticated ? (
                <li className="relative profile-dropdown ml-4">
                  <motion.div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={handleProfileClick}
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
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <span className="text-sm">{user?.name || 'User'}</span>
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
                <motion.li 
                  className="cursor-pointer ml-4"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
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

          {/* Mobile Icons (Wishlist + Cart + Hamburger) */}
          <div className="flex items-center md:hidden gap-4">
            {/* Wishlist Icon - Visible on mobile */}
            <Link to="/wishlist" className="relative flex items-center">
              <svg
                className="w-5 h-5"
                fill={wishlistCount > 0 ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon - Visible on mobile */}
            <Link to="/cart" className="relative flex items-center">
              <svg
                className="w-5 h-5"
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
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
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

                {/* Mobile Wishlist */}
                <motion.div 
                  className="w-full text-center border-b border-gray-200 py-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Link 
                    to="/wishlist" 
                    className="relative inline-flex items-center text-gray-800"
                    onClick={handleLinkClick}
                  >
                    <span>Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="ml-2 bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </motion.div>

                {/* Mobile Cart */}
                <motion.div 
                  className="w-full text-center border-b border-gray-200 py-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: (navItems.length + 1) * 0.1 }}
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

                {/* Mobile Authentication Links */}
                {isAuthenticated ? (
                  <>
                    <motion.div
                      className="w-full text-center border-b border-gray-200 py-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: (navItems.length + 2) * 0.1 }}
                    >
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                          {user?.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt="Profile" 
                              className="w-10 bg-yellow-600 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-lg font-bold text-black">
                              {user?.name?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        <span className="text-gray-800 font-medium">{user?.name || 'User'}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      className="w-full text-center border-b border-gray-200 py-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: (navItems.length + 3) * 0.1 }}
                    >
                      <Link
                        to="/profile"
                        className="text-gray-800"
                        onClick={handleLinkClick}
                      >
                        My Profile
                      </Link>
                    </motion.div>
                    <motion.div
                      className="w-full text-center border-b border-gray-200 py-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: (navItems.length + 4) * 0.1 }}
                    >
                      <Link
                        to="/orders"
                        className="text-gray-800"
                        onClick={handleLinkClick}
                      >
                        My Orders
                      </Link>
                    </motion.div>
                    <motion.div
                      className="w-full text-center border-b border-gray-200 py-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: (navItems.length + 5) * 0.1 }}
                    >
                      <button
                        onClick={handleLogout}
                        className="text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    className="w-full text-center border-b border-gray-200 py-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: (navItems.length + 2) * 0.1 }}
                  >
                    <Link
                      to="/signup"
                      className="text-gray-800 font-medium"
                      onClick={handleLinkClick}
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;