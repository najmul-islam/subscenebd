import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const tmdbApiSlice = createApi({
  reducerPath: "tmdbapi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_TMDB_API_URL }),
  endpoints: (builder) => ({}),
});
