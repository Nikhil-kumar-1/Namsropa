// wishlistSlice.js - Updated version
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { backendUrl } from "./config/config";

// ✅ Fetch wishlist from backend
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log('No token found, returning empty wishlist');
        return [];
      }

      const response = await fetch(`${backendUrl}/api/wishlist`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch wishlist");
      }

      const data = await response.json();
      console.log('Wishlist fetched:', data.wishlist?.items?.length || 0, 'items');
      return data.wishlist?.items || [];
    } catch (error) {
      console.error('Error in fetchWishlist:', error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Add item to wishlist
export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to add items to wishlist");
      }

      console.log('Adding to wishlist:', productId);
      
      const response = await fetch(`${backendUrl}/api/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      // Handle token expiry
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        throw new Error("Session expired. Please login again.");
      }

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Unable to add item to wishlist");
      }

      console.log('Add to wishlist successful');
      
      // Success case - fetch updated wishlist
      dispatch(fetchWishlist());
      return result;

    } catch (error) {
      console.error('Error in addToWishlistAsync:', error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Remove item from wishlist
export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeFromWishlistAsync",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please login to remove items");
      }

      console.log('Removing from wishlist:', productId);

      const response = await fetch(`${backendUrl}/api/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to remove item from wishlist");
      }

      console.log('Remove from wishlist successful');
      
      // Success case - return productId for immediate removal
      return productId;

    } catch (error) {
      console.error('Error in removeFromWishlistAsync:', error);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Check if item is in wishlist
export const checkWishlistStatus = createAsyncThunk(
  "wishlist/checkWishlistStatus",
  async (productId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log('No token, returning false for product:', productId);
        return { productId, isInWishlist: false };
      }

      // Validate productId
      if (!productId || productId === 'undefined' || productId.length !== 24) {
        console.log('Invalid product ID:', productId);
        return { productId, isInWishlist: false };
      }

      console.log('Checking wishlist status for:', productId);
      
      const response = await fetch(`${backendUrl}/api/wishlist/check/${productId}`, {
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.log('Wishlist check failed:', data.message);
        return { productId, isInWishlist: false };
      }

      console.log('Wishlist check result:', data.isInWishlist);
      return { productId, isInWishlist: data.isInWishlist };

    } catch (error) {
      console.error('Error in checkWishlistStatus:', error);
      // Don't reject, just return false
      return { productId, isInWishlist: false };
    }
  }
);

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
  wishlistStatus: {},
};

// Slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlistLocal: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product._id === product._id);
      
      if (!existingItem) {
        state.items.push({ 
          product, 
          addedAt: new Date().toISOString() 
        });
        state.wishlistStatus[product._id] = true;
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product._id !== productId);
      state.wishlistStatus[productId] = false;
    },
    
    clearWishlist: (state) => {
      state.items = [];
      state.wishlistStatus = {};
    },
    
    setWishlistItems: (state, action) => {
      state.items = action.payload;
      action.payload.forEach(item => {
        state.wishlistStatus[item.product._id] = true;
      });
    },
    
    clearError: (state) => {
      state.error = null;
    },

    updateWishlistStatus: (state, action) => {
      const { productId, status } = action.payload;
      state.wishlistStatus[productId] = status;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist Cases
      .addCase(fetchWishlist.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => { 
        state.items = action.payload;
        state.loading = false;
        // Update wishlist status for all items
        state.wishlistStatus = {};
        action.payload.forEach(item => {
          if (item.product && item.product._id) {
            state.wishlistStatus[item.product._id] = true;
          }
        });
      })
      .addCase(fetchWishlist.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Add to Wishlist Cases
      .addCase(addToWishlistAsync.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(addToWishlistAsync.fulfilled, (state) => { 
        state.loading = false;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Remove from Wishlist Cases
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter(item => item.product._id !== productId);
        state.wishlistStatus[productId] = false;
        state.loading = false;
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Wishlist Status Cases
      .addCase(checkWishlistStatus.fulfilled, (state, action) => {
        const { productId, isInWishlist } = action.payload;
        state.wishlistStatus[productId] = isInWishlist;
      });
  },
});

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistLoading = (state) => state.wishlist.loading;
export const selectWishlistError = (state) => state.wishlist.error;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (state, productId) => 
  state.wishlist.wishlistStatus[productId] || false;

// Actions
export const { 
  addToWishlistLocal, 
  removeFromWishlist, 
  clearWishlist, 
  setWishlistItems,
  clearError,
  updateWishlistStatus
} = wishlistSlice.actions;

export default wishlistSlice.reducer;