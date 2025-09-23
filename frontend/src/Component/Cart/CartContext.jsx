import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../../config/config";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const userId = localStorage.getItem("userId"); // set userId after login

  useEffect(() => {
    if (userId) {
      axios.get(`${backendUrl}/api/cart/${userId}`).then((res) => {
        setCart(res.data);
      });
    }
  }, [userId]);

  const addToCart = async (product, quantity, size, color) => {
    const res = await axios.post(`${backendUrl}/api/cart/add`, {
      userId,
      productId: product._id,
      quantity,
      size,
      color,
    });
    setCart(res.data);
  };

  const updateQuantity = async (productId, size, color, quantity) => {
    const res = await axios.put(`${backendUrl}/api/cart/update`, {
      userId,
      productId,
      size,
      color,
      quantity,
    });
    setCart(res.data);
  };

  const removeFromCart = async (productId, size, color) => {
    const res = await axios.delete(`${backendUrl}/api/cart/remove`, {
      data: { userId, productId, size, color },
    });
    setCart(res.data);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
