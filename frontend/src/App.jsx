// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import AboutPage from "./Component/About/AboutPage";
import Navbar from "./Component/Home/Navbar";
import Footer from "./Component/Home/Footer/Footer";
import HOME from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import PrivacyPolicy from "./Component/Privacy/Privacy";
import PaymentsShipping from "./Component/PaymentShipping/PaymentShipping";
import ReturnsCancellations from "./Component/ReturnsAndRefund/ReturnAndRefund";
import ContactUs from "./Component/Contact/Contact";
import Product from "./Component/Product/Product";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import ProductDetails from "./Component/Product/ProductDetails";
import ProductByCategory from "./Component/Product/ProductByCategory";
import ScrollToTop from "./Component/ScrollToTop";
import Cart from "./Component/Cart/Cart";
import SizeChart from "./Component/SizeAndChart/SizeChart";
import NotFound from "./Component/NotFound/NotFound";

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppContent = () => {
  const location = useLocation();

  // check agar route "/admin" se start ho raha hai
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HOME />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/payment-shipping" element={<PaymentsShipping />} />
        <Route path="/returns" element={<ReturnsCancellations />} />
        <Route path="/contact" element={<ContactUs />} />   
        <Route path="/products" element={<Product />} /> 
        <Route path="/product/:id" element={<ProductDetails />} /> 
        <Route path="/category/:category" element={<ProductByCategory />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/size-chart" element={<SizeChart />} />

        {/* ✅ Protected Admin Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
