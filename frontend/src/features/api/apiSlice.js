import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/api`,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.user?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOption) => {
    let result = await baseQuery(args, api, extraOption);

    if (result?.error?.status === 401) {
      api.dispatch(logout());
      localStorage.removeItem("user");
    }
    return result;
  },
  tagTypes: [
    "Subtitles",
    "Subtitle",
    "Users",
    "User",
    "UserSubtitles",
    "UserSubtitle",
    "DownloadSubtitles",
    "DownloadSubtitle",
    "SearchUsers",
    "SearchSubtitles",
    "Notifications",
    "UnseenMessage",
  ],
  endpoints: (builder) => ({}),
});
