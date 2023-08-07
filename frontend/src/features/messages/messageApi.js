import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (partnerId) => ({
        url: `/messages/${partnerId}`,
        method: "GET",
      }),
    }),

    createMessage: builder.mutation({
      query: ({ partnerId, data }) => ({
        url: `/messages/${partnerId}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {},
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
