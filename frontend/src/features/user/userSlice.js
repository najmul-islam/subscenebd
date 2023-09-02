import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userSearchQuery: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userSearch: (state, action) => {
      state.userSearchQuery = action.payload;
    },
  },
});

export const { userSearch } = userSlice.actions;
export default userSlice.reducer;
