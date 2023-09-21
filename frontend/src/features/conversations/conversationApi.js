import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";
import { messageApi } from "../messages/messageApi";

export const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `/conversations`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io(process.env.REACT_APP_API_URI, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });

        try {
          await cacheDataLoaded;
          socket.on("conversation", (data) => {
            const { message, conversation } = data;

            updateCachedData((draft) => {
              const singleConvarsation = draft?.find(
                (con) => con._id === conversation?._id
              );
              singleConvarsation.lastMessage = conversation.lastMessage;
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    createConversation: builder.mutation({
      query: ({ partnerId, data }) => ({
        url: `/conversations`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result && result?.data?.conversation) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                undefined,
                (draft) => {
                  draft.push(result.data.conversation);
                }
              )
            );
          }

          if (result && result?.data && result?.data?.message) {
            dispatch(
              messageApi.util.updateQueryData(
                "getMessages",
                arg.partnerId.toString(),
                (draft) => {
                  // console.log("message", JSON.stringify(draft));
                  draft.push(result.data.message);
                  // console.log("after message", JSON.stringify(draft));
                }
              )
            );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetConversationsQuery, useCreateConversationMutation } =
  conversationApi;
