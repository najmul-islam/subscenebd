import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    getUserSubtitle: builder.query({
      query: (id) => ({
        url: `/user/${id}/subtiles`,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useGetUserSubtitleQuery } =
  userApi;
