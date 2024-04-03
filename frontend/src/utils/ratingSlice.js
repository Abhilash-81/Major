import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    data: null,
  },
  reducers: {
    addRatings: (state, action) => {
      state.data = action.payload;
    },
    removeRatings: (state, action) => {
      state.data = null;
    },
  },
});

export const { addRatings, removeRatings } = ratingSlice.actions;

export default ratingSlice.reducer;
