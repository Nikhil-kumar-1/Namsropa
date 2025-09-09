import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EcommerceNavbar from "./Component/Home/Navbar";
import Home from "./Component/Home/Home";
import Footer from "./Component/Home/Footer/Footer";



const App = () => {
  return (
    <Router>

      <EcommerceNavbar />

   
      <Routes>
       
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
