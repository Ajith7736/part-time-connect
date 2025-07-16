import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem("wishlist")) || [],
  total: Number(localStorage.getItem("totalwishlist")) || 0
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addtowishlist: (state, action) => {
      let job = action.payload;
      if (!state.items.find(item => item._id == job._id)) {
        state.items.push(job);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
        state.total += 1;
        localStorage.setItem("totalwishlist", state.total)
      }
    },
    removefromwishlist: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      state.total -= 1;
      localStorage.setItem("totalwishlist", state.total)
    },
    clearwishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
      state.total = 0;
      localStorage.removeItem("totalwishlist")
    },
  },
})

// Action creators are generated for each case reducer function
export const { addtowishlist, removefromwishlist, clearwishlist } = wishlistSlice.actions

export default wishlistSlice.reducer