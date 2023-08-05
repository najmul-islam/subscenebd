import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `/conversations`,
        method: "GET",
      }),
      providesTags: ["Conversations"],
    }),
    getConversation: builder.query({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Conversation"],
    }),
    createConversation: builder.mutation({
      query: (participantId) => ({
        url: `/conversations`,
        method: "POST",
        body: participantId,
      }),
      invalidatesTags: ["Conversations"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
} = conversationApi;
