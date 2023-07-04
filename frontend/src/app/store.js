import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { tmdbApiSlice } from "../features/api/tmdbApiSlice";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [tmdbApiSlice.reducerPath]: tmdbApiSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares()
      .concat(apiSlice.middleware)
      .concat(tmdbApiSlice.middleware),
});
