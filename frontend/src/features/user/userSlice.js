import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUserQuery: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.searchUserQuery = action.payload;
    },
  },
});

export const { searchUser } = userSlice.actions;
export default userSlice.reducer;
