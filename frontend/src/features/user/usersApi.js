import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    getUsersBySearch: builder.query({
      query: (searchQuery) => ({
        url: `/users/search?name=${searchQuery}`,
        method: "GET",
      }),
      providesTags: ["SearchUsers"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    putUserProfile: builder.mutation({
      query: (data) => ({
        url: `/users/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users", "User"],
    }),
    putUserAvatar: builder.mutation({
      query: (data) => ({
        url: `/users/profile/avatar`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result && result?.data) {
            const user = JSON.parse(localStorage.getItem("user"));
            user.avatar = result.data.avatar;
            localStorage.setItem("user", JSON.stringify(user));
          }
        } catch (error) {}
      },
      invalidatesTags: ["Users", "User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // not neccery
    getUserSubtitle: builder.query({
      query: (userId) => ({
        url: `/users/subtitles/${userId}`,
        method: "GET",
        providesTags: ["UserSubtitles"],
      }),
    }),

    getUserDownloadSub: builder.query({
      query: () => ({
        url: `/users/downloads`,
        method: "GET",
      }),
      providesTags: ["DownloadSubtitles"],
    }),

    putUserDownloadSub: builder.mutation({
      query: (subtitleId) => ({
        url: `/users/downloads/${subtitleId}`,
        method: "PUT",
      }),
      invalidatesTags: ["DownloadSubtitles"],
    }),

    putFollower: builder.mutation({
      query: (id) => ({
        url: `/users/follow/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User", "Subtitle"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetUsersBySearchQuery,
  usePutFollowerMutation,
  useGetUserDownloadSubQuery,
  usePutUserDownloadSubMutation,
  useGetUserProfileQuery,
  usePutUserProfileMutation,
  usePutUserAvatarMutation,
} = userApi;
