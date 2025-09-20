import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if exists
const savedCart = localStorage.getItem("cartItems");
const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const saveToLocalStorage = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, size, color, customMeasurements, sizeType } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product._id === product._id &&
          item.size === size &&
          item.color === color &&
          JSON.stringify(item.customMeasurements) === JSON.stringify(customMeasurements)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ 
          product, 
          quantity, 
          size, 
          color, 
          customMeasurements, 
          sizeType 
        });
      }

      saveToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const { productId, size, color, customMeasurements } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product._id === productId &&
            item.size === size &&
            item.color === color &&
            JSON.stringify(item.customMeasurements) === JSON.stringify(customMeasurements)
          )
      );

      saveToLocalStorage(state.items);
    },

    updateQuantity: (state, action) => {
      const { productId, size, color, customMeasurements, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.product._id === productId &&
          i.size === size &&
          i.color === color &&
          JSON.stringify(i.customMeasurements) === JSON.stringify(customMeasurements)
      );
      if (item) item.quantity = quantity;

      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

// Selector for total items
export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;