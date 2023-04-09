import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice"
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware:(getDefaultMiddlewares)=> getDefaultMiddlewares().concat(apiSlice.middleware)
});
