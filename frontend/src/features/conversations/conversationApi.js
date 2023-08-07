import { apiSlice } from "../api/apiSlice";
import { messageApi } from "../messages/messageApi";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `/conversations`,
        method: "GET",
      }),
    }),

    createConversation: builder.mutation({
      query: (data) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),
      // on query started
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled;
        console.log("conversation.data", conversation.data);
        if (conversation && conversation?.data) {
          dispatch(
            conversationApi.util.updateQueryData(
              "getConversations",
              undefined,
              (draft) => {
                console.log("draft", JSON.stringify(draft));
                return [conversation.data, ...draft];
              }
            )
          );
        }
      },
      // on query end
    }),
  }),
});

export const { useGetConversationsQuery, useCreateConversationMutation } =
  conversationApi;
