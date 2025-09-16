// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import AboutPage from "./Component/About/AboutPage";

import Navbar from "./Component/Home/Navbar"
import Footer from "./Component/Home/Footer/Footer";
import HOME from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import NotFound from "./Component/NotFound/NotFound";
import Signup from "./Component/Signup/Signup";
import PrivacyPolicy from "./Component/Privacy/Privacy";
import PaymentsShipping from "./Component/PaymentShipping/PaymentShipping";
import ReturnsCancellations from "./Component/ReturnsAndRefund/ReturnAndRefund";
import ContactUs from "./Component/Contact/Contact";
import Product from "./Component/Product/Product";
import AdminDashboard from "./Component/Admin/AdminDashboard";
import ProductDetails from "./Component/Product/ProductDetails";



const AppContent = () => {
  const location = useLocation();

  // check agar route "/admin" se start ho raha hai
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
     
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
        <Route path="/products" element={<Product/>} /> 
        <Route path="/product/:id" element={<ProductDetails />} /> 
        <Route path="/admin" element={<AdminDashboard />} />   
        
        <Route path="*" element={<NotFound />} />

        ✅ Protected Admin Route
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;