import { tmdbApiSlice } from "../api/tmdbApiSlice";

// https://api.themoviedb.org/3/search/tv?api_key=8e5c3bcd2bfff9e17e7fb1d45a783c98
// https://api.themoviedb.org/3/tv/1399?api_key=8e5c3bcd2bfff9e17e7fb1d45a783c98
// https://api.themoviedb.org/3/tv/1399/season/1?api_key=8e5c3bcd2bfff9e17e7fb1d45a783c98

export const seriesApi = tmdbApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeriesBySearch: builder.query({
      query: (query) => ({
        url: `/search/tv?&api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`,
        method: "GET",
      }),
    }),

    getSeriesById: builder.query({
      query: (tmdbId) => ({
        url: `/tv/${tmdbId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        method: "GET",
      }),
    }),

    getSeasonById: builder.query({
      query: ({ seriesId, seasonId }) => ({
        url: `/tv/${seriesId}/season/${seasonId}?&api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSeriesBySearchQuery,
  useGetSeriesByIdQuery,
  useGetSeasonByIdQuery,
} = seriesApi;
