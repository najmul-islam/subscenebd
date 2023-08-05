import { createSlice } from "@reduxjs/toolkit";

const color = localStorage.getItem("color");
const initialState = {
  mode: color ? color : "light",
  sidebar: false,
  selectedUrl: window.location.pathname,
  drawerWidth: 280,
  isUserSearchFocus: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleColor: (state, action) => {
      const color = action.payload === "light" ? "dark" : "light";
      state.mode = color;
      localStorage.setItem("color", color);
    },
    toggleListitem: (state, action) => {
      state.selectedUrl = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    toggleUserSearchFocus: (state, action) => {
      state.isUserSearchFocus = action.payload;
    },
  },
});

export const {
  toggleColor,
  toggleListitem,
  toggleSidebar,
  toggleUserSearchFocus,
} = themeSlice.actions;
export default themeSlice.reducer;
