import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/notification`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io("http://localhost:5000", {
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
          socket.on("notification", (data) => {
            const { notification } = data;
            updateCachedData((draft) => {
              const index = draft.findIndex(
                (item) => item.receiver._id === notification.receiver._id
              );

              if (index !== -1) {
                draft.unshift(notification);
              }
            });
          });
        } catch (error) {
          console.log(error);
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),

    editNotifications: builder.mutation({
      query: () => ({
        url: `/notification/seen`,
        method: "PUT",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotifications",
                undefined,
                (draft) => {
                  draft.length = 0;
                  draft.push(...result.data);
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetNotificationsQuery, useEditNotificationsMutation } =
  notificationApi;
