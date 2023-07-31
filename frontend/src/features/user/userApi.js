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
    getUserProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    putUserProfile: builder.mutation({
      query: (data) => ({
        url: `/user/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users", "User"],
    }),
    putUserAvatar: builder.mutation({
      query: (data) => ({
        url: `/user/profile/avatar`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users", "User"],
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // not neccery
    getUserSubtitle: builder.query({
      query: (userId) => ({
        url: `/user/subtitles/${userId}`,
        method: "GET",
        providesTags: ["UserSubtitles"],
      }),
    }),

    getUserDownloadSub: builder.query({
      query: () => ({
        url: `/user/downloads`,
        method: "GET",
      }),
      providesTags: ["DownloadSubtitles"],
    }),

    putUserDownloadSub: builder.mutation({
      query: (subtitleId) => ({
        url: `/user/downloads/${subtitleId}`,
        method: "PUT",
      }),
      invalidatesTags: ["DownloadSubtitles"],
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

export const {
  useGetUsersQuery,
  useGetUserQuery,
  usePutFollowerMutation,
  useGetUserDownloadSubQuery,
  usePutUserDownloadSubMutation,
  useGetUserProfileQuery,
  usePutUserProfileMutation,
  usePutUserAvatarMutation,
} = userApi;
