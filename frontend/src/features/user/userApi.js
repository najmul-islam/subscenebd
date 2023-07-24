import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    putFollower: builder.mutation({
      query: (id) => ({
        url: `/user/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User", "Subtitle"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, usePutFollowerMutation } =
  userApi;
