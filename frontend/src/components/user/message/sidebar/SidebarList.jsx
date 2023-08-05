import SidebarItem from "./SidebarItem";
import {
  List,
  Divider,
  Box,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Stack,
} from "@mui/material";

import {
  AccessTimeOutlined,
  BarChartOutlined,
  VideoLibraryOutlined,
  MovieOutlined,
  SmartDisplayOutlined,
  MovieFilterOutlined,
  MusicVideoOutlined,
  Search,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import { useGetConversationsQuery } from "../../../../features/conversations/conversationApi";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUsersBySearchQuery,
  userApi,
} from "../../../../features/user/usersApi";
import SearchedList from "./SearchedList";

const SidebarList = () => {
  const [searchUsers, setSearchUsers] = useState([]);
  const { isUserSearchFocus } = useSelector((state) => state.theme);
  const { searchUserQuery } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversationsQuery();
  // const { data: searchUsers } = useGetUsersBySearchQuery(searchUser);

  const [list, setList] = useState("latest");

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleList = (e, newList) => {
    setList(newList);
  };

  // console.log("conversation", conversations);
  // console.log("user", user);
  // console.log("search query", searchUserQuery);
  // console.log("search user", searchUsers);

  useEffect(() => {
    dispatch(userApi.endpoints.getUsersBySearch.initiate(searchUserQuery))
      .unwrap()
      .then((data) => setSearchUsers(data));
  }, [dispatch, searchUserQuery]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Box>
      <Typography variant="h5" paddingY={2} marginLeft={2} fontWeight={700}>
        Chats
      </Typography>

      <SearchBox />

      {isUserSearchFocus ? (
        <Box>
          {searchUserQuery ? (
            <Stack
              paddingLeft={3}
              paddingY={1}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Search sx={{ width: "24px", height: "24px" }} />
              <Typography variant="subtitle2" noWrap>
                Search for "{searchUserQuery}"
              </Typography>
            </Stack>
          ) : null}
          <SearchedList searchUsers={searchUsers} />
        </Box>
      ) : (
        <List sx={{ paddingY: "10px" }}>
          {conversations?.map((conversation) => (
            <SidebarItem key={conversation._id} conversation={conversation} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default SidebarList;
