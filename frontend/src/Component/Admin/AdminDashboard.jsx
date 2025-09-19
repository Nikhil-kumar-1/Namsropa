// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { FiMenu, FiX, FiHome, FiLogOut, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import AllProducts from "./AllProduct";
import { backendUrl } from "../../config/config";

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activePage, setActivePage] = useState("form"); // 'form' | 'products'
  const [editingProduct, setEditingProduct] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // used to tell AllProducts to refetch
  const navigate = useNavigate();

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMobile &&
        isOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isOpen]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Called by AllProducts when user clicks Edit
  const handleEditRequest = (product) => {
    setEditingProduct(product);
    setActivePage("form");
    if (isMobile) setIsOpen(false);
  };

  // Called by ProductForm when saved/closed
  const handleFormClose = (options = { refresh: true }) => {
    setEditingProduct(null);
    if (options.refresh) {
      setReloadKey((k) => k + 1);
      setActivePage("products");
    } else {
      setActivePage("form");
    }
    if (isMobile) setIsOpen(false);
  };

  // Open products list
  const openProducts = () => {
    setActivePage("products");
    setEditingProduct(null);
    if (isMobile) setIsOpen(false);
  };

  // Open product form for new
  const openProductForm = () => {
    setActivePage("form");
    setEditingProduct(null);
    if (isMobile) setIsOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Overlay (mobile) */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed md:relative z-20 w-64 bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-2xl h-full transform ${
          isOpen ? "translate-x-0" : "-translate-x-64 md:translate-x-0"
        } transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo/Header */}
        <div className="p-5 border-b border-indigo-600 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-md">
              <span className="text-indigo-800 font-bold text-lg">A</span>
            </div>
            <h1 className="text-white font-bold text-xl">Admin Panel</h1>
          </div>
          <button
            className="md:hidden text-white hover:text-indigo-200 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-4 px-3">
          <button
            onClick={openProductForm}
            className={`w-full flex items-center justify-between space-x-3 p-3 rounded-lg shadow-md mb-3 ${
              activePage === "form"
                ? "bg-white text-indigo-700"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiPlus size={18} />
              <span className="font-medium">Add Product</span>
            </div>
            <span className="text-xs">{activePage === "form" ? "Active" : ""}</span>
          </button>

          <button
            onClick={openProducts}
            className={`w-full mt-2 flex items-center justify-between space-x-3 p-3 rounded-lg shadow-md ${
              activePage === "products"
                ? "bg-white text-indigo-700"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              <FiHome size={18} />
              <span className="font-medium">Products</span>
            </div>
            <span className="text-xs">{activePage === "products" ? "Active" : ""}</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-indigo-600">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-indigo-200 hover:text-white p-3 rounded-lg transition-colors duration-200 hover:bg-indigo-600"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white shadow-sm p-4">
          <button
            className="menu-button md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {activePage === "form" ? (editingProduct ? "Edit Product" : "Add Product") : "All Products"}
          </h1>
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-medium shadow-sm">
            A
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activePage === "form" && (
            <ProductForm
              product={editingProduct}
              onClose={handleFormClose}
              backendUrl={backendUrl}
            />
          )}

          {activePage === "products" && (
            <AllProducts
              onEdit={handleEditRequest}
              reloadKey={reloadKey}
              backendUrl={backendUrl}
            />
          )}
        </main>
      </div>
    </div>
  );
}
