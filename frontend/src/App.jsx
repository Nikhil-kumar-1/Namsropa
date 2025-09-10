import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceNavbar from "./Component/Home/Navbar";
import Home from "./Component/Home/Home";
import Footer from "./Component/Home/Footer/Footer";
import AboutPage from "./Component/About/AboutPage";
import ProductCustomizer from "./Component/Product/Product";



const App = () => {
  return (
    <Router>

      <EcommerceNavbar />

   
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/product" element={<ProductCustomizer/>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
