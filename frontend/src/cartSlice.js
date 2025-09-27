import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch cart from backend
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const response = await fetch("http://localhost:5000/api/cart/getCart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      return data.cart.items || []; // Only return items
    } catch (error) {
      console.error("Fetch Cart Error:", error);
      return rejectWithValue([]);
    }
  }
);

// Add item to cart (API + Redux)
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (cartData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to add items to cart");

      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        // Add item to Redux immediately
        dispatch(addToCartLocal(result.cartItem || cartData)); 
        return result;
      } else {
        throw new Error(result.message || "Unable to add item");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const { productId, quantity, size, color, customMeasurements, sizeType, product } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.size === size &&
          item.color === color &&
          JSON.stringify(item.customMeasurements) === JSON.stringify(customMeasurements)
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, quantity, size, color, customMeasurements, sizeType, product });
      }
    },
    removeFromCart: (state, action) => {
      const { productId, size, color, customMeasurements } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color === color &&
            JSON.stringify(item.customMeasurements) === JSON.stringify(customMeasurements)
          )
      );
    },
    updateQuantity: (state, action) => {
      const { productId, size, color, customMeasurements, quantity } = action.payload;
      const item = state.items.find(
        (i) =>
          i.productId === productId &&
          i.size === size &&
          i.color === color &&
          JSON.stringify(i.customMeasurements) === JSON.stringify(customMeasurements)
      );
      if (item) item.quantity = quantity;
    },
    clearCart: (state) => {
      state.items = [];
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to cart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;

export const { addToCartLocal, removeFromCart, updateQuantity, clearCart, setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
