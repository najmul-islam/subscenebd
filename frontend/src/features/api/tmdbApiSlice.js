import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl:process
// })

export const tmdbApiSlice = createApi({
  reducerPath: "tmdbapi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_TMDB_API_URL,
    prepareHeaders: async (headers, { getState, endpoints }) => {
      const token = process.env.REACT_APP_TMDB_API_TOKEN;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({}),
});
