import { createSlice } from "@reduxjs/toolkit";

const tweetsSlice = createSlice({
  name: "tweets",
  initialState: {
    allTweets: null,
  },
  reducers: {
    addTweets: (state, action) => {
      state.allTweets = action.payload;
    },
  },
});

export const { addTweets } = tweetsSlice.actions;

export default tweetsSlice.reducer;
