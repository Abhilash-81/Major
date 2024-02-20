import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "./userSlice.js";
import tweetsReducer from "./tweetsSlice";
import usersReducer from "./usersSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducer = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const appStore = configureStore({
  reducer: persistedReducer,
});

export default appStore;
