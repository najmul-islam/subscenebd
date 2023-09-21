import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";
import { conversationApi } from "../conversations/conversationApi";

export const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (partnerId) => ({
        url: `/messages/${partnerId}`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const socket = io(process.env.REACT_APP_API_URI, {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
          withCredentials: true,
        });

        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            const { message, conversation } = data;
            if (message?.sender?._id === arg) {
              updateCachedData((draft) => {
                draft.push(message);
              });
            }
          });
        } catch (error) {
          console.log(error);
        }

        await cacheEntryRemoved;
        socket.close();
      },
    }),

    createMessage: builder.mutation({
      query: ({ senderId, partnerId, data }) => ({
        url: `/messages/${partnerId}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const sender = arg.senderId;
        const receiver = arg.partnerId;
        const text = arg.data.text;
        const createdAt = arg.data.createdAt;

        const newLastMessage = {
          sender,
          receiver,
          text,
          createdAt,
        };

        const messageResult = dispatch(
          apiSlice.util.updateQueryData(
            "getMessages",
            arg.partnerId.toString(),
            (draft) => {
              let sender;
              let receiver;

              const message = draft[0];
              if (message) {
                const senderRole =
                  message.sender._id === arg.senderId ? "sender" : "receiver";
                const receiverRole =
                  message.sender._id === arg.partnerId ? "sender" : "receiver";

                sender = message[senderRole];
                receiver = message[receiverRole];
              }

              draft.push({
                _id: Date.now().toString(),
                sender,
                receiver,
                text,
                createdAt,
              });
            }
          )
        );

        const conversationResult = dispatch(
          conversationApi.util.updateQueryData(
            "getConversations",
            undefined,
            (draft) => {
              return draft.map((conversation) => {
                const hasSender = conversation.participants.some(
                  (participant) => participant._id === sender
                );

                const hasReceiver = conversation.participants.some(
                  (participant) => participant._id === receiver
                );

                if (hasSender && hasReceiver) {
                  return {
                    ...conversation,
                    updatedAt: new Date().toISOString(),
                    lastMessage: newLastMessage,
                  };
                }
                return conversation;
              });
            }
          )
        );

        try {
        } catch (error) {
          conversationResult.undo();
          messageResult.undo();
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;
