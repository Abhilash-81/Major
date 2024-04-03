import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: null,
    token: null,
    userId: null,
    image: null,
  },
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        userId: action.payload._id,
        image: action.payload.image,
      };
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
