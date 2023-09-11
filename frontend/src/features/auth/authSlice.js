import { createSlice } from "@reduxjs/toolkit";
// get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      // apiSlice.util.invalidateTags(["User", "Users"]);
      state.user = action.payload;
      // set auth info to the localStorage when loggedIn
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = undefined;
      // remove auth info from localStorage when loggedOut
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
