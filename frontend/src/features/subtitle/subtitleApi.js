import { apiSlice } from "../api/apiSlice";

export const subtitleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtitles: builder.query({
      query: ({ page, limit }) => ({
        url: `/subtitles?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Subtitles"],
    }),

    getSubtitle: builder.query({
      query: (id) => ({
        url: `/subtitles/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [{ type: "Subtitle", id: arg }],
    }),

    postSubtitle: builder.mutation({
      query: (data) => ({
        url: "/subtitles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subtitles"],
    }),

    downloadSubtitle: builder.query({
      query: (subtitleId) => ({
        url: `/subtitles/download/${subtitleId}`,
        method: "GET",
      }),
    }),

    countDownloadSubtitle: builder.mutation({
      query: (subtitleId) => ({
        url: `/subtitles/download/${subtitleId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Subtitles", "Subtitle"],
    }),

    likeSubtitle: builder.mutation({
      query: (subtitleId) => ({
        url: `/subtitles/like/${subtitleId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Subtitle"],
    }),

    disLikeSubtitle: builder.mutation({
      query: (subtitleId) => ({
        url: `/subtitles/dislike/${subtitleId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Subtitle"],
    }),
    postComment: builder.mutation({
      query: ({ subtitleId, data }) => ({
        url: `/subtitles/comments/${subtitleId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subtitle"],
    }),
    editComment: builder.mutation({
      query: ({ subtitleId, commentId, data }) => ({
        url: `/subtitles/comments/${subtitleId}/${commentId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subtitle"],
    }),

    deleteComment: builder.mutation({
      query: ({ subtitleId, commentId }) => ({
        url: `/subtitles/comments/${subtitleId}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subtitle"],
    }),

    patchSubtitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subtitle/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Subtitles",
        { type: "Subtitle", id: arg.id },
      ],
    }),

    deleteSubtitle: builder.mutation({
      query: (id) => ({
        query: (id) => ({
          url: `/subtitles/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Subtitles"],
      }),
    }),
  }),
});

export const {
  useGetSubtitlesQuery,
  useGetSubtitleQuery,
  usePostSubtitleMutation,
  usePatchSubtitleMutation,
  useLikeSubtitleMutation,
  useDisLikeSubtitleMutation,
  useDownloadSubtitleQuery,
  useCountDownloadSubtitleMutation,
  useDeleteSubtitleMutation,
  usePostCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = subtitleApi;
