import { tmdbApiSlice } from "../api/tmdbApiSlice";

// https://api.themoviedb.org/3/movie/14160?api_key=8e5c3bcd2bfff9e17e7fb1d45a783c98
// https://api.themoviedb.org/3/search/movie?&api_key=8e5c3bcd2bfff9e17e7fb1d45a783c98&query=

export const movieApi = tmdbApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovieBySearch: builder.query({
      query: (query) => ({
        url: `/search/movie?query=${query}`,
        method: "GET",
      }),
    }),

    getMovieById: builder.query({
      query: (tmdbId) => ({
        url: `/movie/${tmdbId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMovieBySearchQuery, useGetMovieByIdQuery } = movieApi;
