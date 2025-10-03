import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "./config/config";

// ✅ Fetch cart from backend
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return [];

      const response = await fetch(`${backendUrl}/api/cart/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      return data.cart?.items || data.items || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add item to cart (API + Redux)
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async (cartData, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to add items to cart");

      const response = await fetch(`${backendUrl}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please login again.");
      }

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Unable to add item");
      }

      // Success case - fetch updated cart
      dispatch(fetchCart());
      return result;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Remove item from cart (API + Redux)
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (itemId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to remove items");

      const response = await fetch(`${backendUrl}/api/cart/remove/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to remove item");
      }

      // Success case - return itemId for immediate removal
      return itemId;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Update quantity
export const updateQuantityAsync = createAsyncThunk(
  "cart/updateQuantityAsync",
  async ({ id, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to update cart");

      const response = await fetch(`${backendUrl}/api/cart/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update item");
      }

      // Return updated data for immediate update
      return { id, quantity };

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Clear entire cart
export const clearCartAsync = createAsyncThunk(
  "cart/clearCartAsync",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to clear cart");

      const response = await fetch(`${backendUrl}/api/cart/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to clear cart");
      }

      return []; // Return empty array

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
  lastUpdated: null,
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Local add reducer (for immediate UI update)
    addToCartLocal: (state, action) => {
      const { 
        productId, 
        quantity, 
        size, 
        color, 
        customMeasurements, 
        sizeType, 
        product,
        _id 
      } = action.payload;
      
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
        state.items.push({ 
          _id: _id || `temp-${Date.now()}`,
          productId, 
          quantity, 
          size, 
          color, 
          customMeasurements, 
          sizeType, 
          product 
        });
      }
      state.lastUpdated = Date.now();
    },
    
    // ✅ Local remove reducer (for immediate UI update)
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      state.lastUpdated = Date.now();
    },
    
    // ✅ Update quantity locally
    updateQuantityLocal: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        item.quantity = quantity;
        state.lastUpdated = Date.now();
      }
    },
    
    // ✅ Clear cart locally
    clearCart: (state) => {
      state.items = [];
      state.lastUpdated = Date.now();
    },
    
    // ✅ Set cart items (for sync)
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.lastUpdated = Date.now();
    },
    
    // ✅ Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Cases
      .addCase(fetchCart.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchCart.fulfilled, (state, action) => { 
        state.items = action.payload;
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCart.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload;
      })

      // Add to Cart Cases
      .addCase(addToCartAsync.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(addToCartAsync.fulfilled, (state) => { 
        state.loading = false;
        // Cart will be updated via fetchCart in the thunk
      })
      .addCase(addToCartAsync.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Remove from Cart Cases
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Quantity Cases
      .addCase(updateQuantityAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.items.find((item) => item._id === id);
        if (item) {
          item.quantity = quantity;
        }
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(updateQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear Cart Cases
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.lastUpdated = Date.now();
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => 
  state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => {
    const price = item.product?.price || item.price || 0;
    const discount = item.product?.discount || item.discount || 0;
    const discountedPrice = price - (price * discount / 100);
    return total + (discountedPrice * (item.quantity || 0));
  }, 0);
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCartLastUpdated = (state) => state.cart.lastUpdated;

// Check if item is in cart
export const selectIsItemInCart = (state, productId, size, color, customMeasurements = {}) => {
  return state.cart.items.some(item =>
    item.productId === productId &&
    item.size === size &&
    item.color === color &&
    JSON.stringify(item.customMeasurements) === JSON.stringify(customMeasurements)
  );
};

// Actions
export const { 
  addToCartLocal, 
  removeFromCart, 
  updateQuantityLocal,
  clearCart, 
  setCartItems,
  clearError 
} = cartSlice.actions;

export default cartSlice.reducer;