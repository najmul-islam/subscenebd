import { createSlice } from "@reduxjs/toolkit";

const subtitles = JSON.parse(localStorage.getItem("subtitles"));

const initialState = {
  subtitles: subtitles ? subtitles : [],
  searchSubtitle: "",
};

export const subtitleSlice = createSlice({
  name: "subtitle",
  initialState,
  reducers: {
    searchSubtitle: (state, action) => {
      state.searchSubtitle = action.payload;
    },
    addSubtitle: (state, action) => {
      const newSubtitle = action.payload;
      const existingSubtitleIndex = state.subtitles.findIndex(
        (subtitle) => subtitle._id === newSubtitle._id
      );
      if (existingSubtitleIndex === -1) {
        // If the new subtitle doesn't exist in the state, add it
        state.subtitles.push(newSubtitle);
      } else {
        // If the new subtitle already exists in the state, update it
        state.subtitles[existingSubtitleIndex] = newSubtitle;
      }

      // set subtitle info in the localstorage
      localStorage.setItem("subtitles", JSON.stringify(state.subtitles));
    },
    removeSubtitle: (state, action) => {
      const subtitleToRemove = action.payload;

      // Filter out the subtitle with the specified id from the state
      state.subtitles = state.subtitles.filter(
        (subtitle) => subtitle._id !== subtitleToRemove._id
      );

      // Update the subtitle info in the local storage after removal
      localStorage.setItem("subtitles", JSON.stringify(state.subtitles));
    },
  },
});

export const { searchSubtitle, addSubtitle, removeSubtitle } =
  subtitleSlice.actions;
export default subtitleSlice.reducer;
