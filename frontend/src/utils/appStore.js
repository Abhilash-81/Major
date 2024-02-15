import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import tweetsReducer from "./tweetsSlice";
import usersReducer from "./usersSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    tweets: tweetsReducer,
    users: usersReducer,
  },
});

export default appStore;
