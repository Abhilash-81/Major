import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import tweetsReducer from "./tweetsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetsReducer,
  },
});

export default appStore;
