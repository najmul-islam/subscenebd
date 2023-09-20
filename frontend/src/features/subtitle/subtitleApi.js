import { apiSlice } from "../api/apiSlice";

export const subtitleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtitles: builder.query({
      query: ({ type, media_type, limit = 36 }) => ({
        url: `/subtitles?type=${type}&media_type=${media_type}&page=1&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Subtitles"],
    }),

    getMoreSubtitles: builder.query({
      query: ({ type, media_type, page, limit = 36 }) => ({
        url: `/subtitles?type=${type}&media_type=${media_type}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
      async onQueryStarted(
        { type, media_type, limit },
        { queryFulfilled, dispatch }
      ) {
        try {
          const result = await queryFulfilled;
          // console.log("data.data.subtitles", data.data.subtitles);
          if (result?.data?.subtitles.length > 0) {
            // console.log("data?.data?.subtitles", result?.data?.subtitles);
            dispatch(
              apiSlice.util.updateQueryData(
                "getSubtitles",
                { type, media_type, limit },
                (draft) => {
                  // console.log("draft", JSON.stringify(draft));
                  draft.page = result.data.page;
                  draft.subtitles = [
                    ...draft.subtitles,
                    ...result.data.subtitles,
                  ];
                  // console.log("updated draft", JSON.stringify(draft));
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getSearchSubtitle: builder.query({
      query: (query) => ({
        url: `/subtitles/search?title=${query}`,
        method: "GET",
      }),
      providesTags: ["SearchSubtitles"],
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
      invalidatesTags: (result, error, arg) => [
        "Subtitles",
        { type: "Subtitle", id: arg },
      ],
    }),

    likeSubtitle: builder.mutation({
      query: ({ subtitleId, data }) => ({
        url: `/subtitles/like/${subtitleId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subtitle"],
    }),

    disLikeSubtitle: builder.mutation({
      query: ({ subtitleId, data }) => ({
        url: `/subtitles/dislike/${subtitleId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subtitle"],
    }),

    postComment: builder.mutation({
      query: ({ subtitleId, data }) => ({
        url: `/subtitles/comments/${subtitleId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subtitle", "Notifications"],
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
        url: `/subtitles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subtitles"],
    }),
  }),
});

export const {
  useGetSubtitlesQuery,
  useGetMoreSubtitlesQuery,
  useGetSearchSubtitleQuery,
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
