import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: null,
  },
  reducers: {
    addUsers: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
