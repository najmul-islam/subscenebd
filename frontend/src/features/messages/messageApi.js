import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (partnerId) => ({
        url: `/messages/${partnerId}`,
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),

    createMessage: builder.mutation({
      query: ({ conversationId, data }) => ({
        url: `/messages/${conversationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages", "Conversations"],
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
