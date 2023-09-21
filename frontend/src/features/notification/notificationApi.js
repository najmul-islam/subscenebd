import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: `/notification?page=1&limit=10`,
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
          socket.on("notification", (data) => {
            const { notification } = data;
            updateCachedData((draft) => {
              // console.log("draft", JSON.stringify(draft));
              const index = draft.notifications.findIndex(
                (item) => item.receiver._id === notification.receiver._id
              );

              if (index !== -1) {
                draft.notifications.unshift(notification);
                draft.unseenNotificatons += 1;
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

    getMoreNotifications: builder.query({
      query: (page) => ({
        url: `/notification?page=${page}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotifications",
                undefined,
                (draft) => {
                  draft.page = result.data.page;
                  draft.notifications = [
                    ...draft.notifications,
                    ...result.data.notifications,
                  ];
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    seenNotifications: builder.mutation({
      query: () => ({
        url: `/notification/seen`,
        method: "PUT",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("result", result);
          if (result) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotifications",
                undefined,
                (draft) => {
                  // console.log("draft", JSON.stringify(draft));
                  draft.unseenNotificatons = result.data.unseenNotificatons;
                  draft.notifications = result.data.notifications;
                  draft.limit = result.data.limit;
                  draft.page = result.data.page;
                  draft.total = result.data.total;
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

    readNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notification/read/${notificationId}`,
        method: "PATCH",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // console.log("result", result);
          if (result) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotifications",
                undefined,
                (draft) => {
                  // console.log("draft", JSON.stringify(draft));
                  const notification = draft.notifications.find(
                    (notification) => notification._id === result.data._id
                  );

                  if (notification) {
                    notification.read = result.data.read;
                  }
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

export const {
  useGetNotificationsQuery,
  useGetMoreNotificationsQuery,
  useSeenNotificationsMutation,
  useReadNotificationMutation,
} = notificationApi;
