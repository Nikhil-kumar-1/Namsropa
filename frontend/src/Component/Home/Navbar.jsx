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
  console.log("Auth state in Navbar:", authState);


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
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6 uppercase tracking-wide">
        {/* Logo */}
        <motion.div
          className="cursor-pointer flex items-center h-14"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="flex items-center">
            <img src="Logo.jpeg" alt="Nam's Ropa Logo" className="h-12 object-contain" />
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
            <li className="relative ml-2">
              <Link to="/wishlist" className="flex items-center">
                ❤️
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>

            {/* Cart */}
            <li className="relative ml-2">
              <Link to="/cart" className="flex items-center">
                🛒
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

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
          {/* Wishlist + Cart icons same as before */}
          {/* Hamburger Menu */}
          <motion.div
            className="flex flex-col space-y-1.5 cursor-pointer z-60"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <span className={`hamburger-line w-6 h-px bg-black ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`hamburger-line w-6 h-px bg-black ${mobileMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`hamburger-line w-6 h-px bg-black ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
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
            <div className="flex flex-col items-center h-full space-y-6 text-xl px-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`w-full text-center border-b border-gray-200 py-4 ${
                    location.pathname === item.path ? "font-bold text-amber-700" : "text-gray-800"
                  }`}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <span className="text-lg font-bold text-black">
                          {user?.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-800 font-medium">{user?.name || "User"}</span>
                  </div>
                  <Link to="/profile" onClick={handleLinkClick} className="text-gray-800 py-2">
                    My Profile
                  </Link>
                  <Link to="/orders" onClick={handleLinkClick} className="text-gray-800 py-2">
                    My Orders
                  </Link>
                  <Link to="/wishlist" onClick={handleLinkClick} className="text-gray-800 py-2">
                    My Wishlist
                  </Link>
                  <button onClick={handleLogout} className="text-red-600 font-medium py-2">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/signup" onClick={handleLinkClick} className="text-gray-800 font-medium py-2">
                  Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
