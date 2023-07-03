import { apiSlice } from "../api/apiSlice";

export const subtitleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubtitles: builder.query({
      query: () => ({
        url: "/subtitles",
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
  useDeleteSubtitleMutation,
} = subtitleApi;
