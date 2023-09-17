import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, Box, Typography, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useGetConversationsQuery } from "../../../../features/conversations/conversationApi";
import { userApi } from "../../../../features/user/usersApi";

import SearchedList from "./SearchedList";
import SidebarItem from "./SidebarItem";
import SearchBox from "./SearchBox";
import SidebarSkeleton from "./SidebarSkeleton";

const SidebarList = () => {
  const [searchUsers, setSearchUsers] = useState([]);
  const { userSearchQuery } = useSelector((state) => state.users);
  const { isUserSearchFocus } = useSelector((state) => state.theme);

  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversationsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userApi.endpoints.getUsersBySearch.initiate(userSearchQuery))
      .unwrap()
      .then((data) => setSearchUsers(data));
  }, [dispatch, userSearchQuery]);

  if (isLoading) return <SidebarSkeleton />;

  const sortedConversations = [...conversations].sort((a, b) =>
    b?.lastMessage?.createdAt.localeCompare(a?.lastMessage?.createdAt)
  );

  return (
    <Box>
      <Typography variant="h5" paddingY={2} marginLeft={2} fontWeight={700}>
        Chats
      </Typography>

      <SearchBox />

      {isUserSearchFocus ? (
        <Box>
          {userSearchQuery ? (
            <Stack
              paddingLeft={3}
              paddingY={1}
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Search sx={{ width: "24px", height: "24px" }} />
              <Typography variant="subtitle2" noWrap>
                Search for "{userSearchQuery}"
              </Typography>
            </Stack>
          ) : null}
          <SearchedList searchUsers={searchUsers} />
        </Box>
      ) : (
        <List sx={{ paddingY: "10px" }}>
          {sortedConversations.map((conversation) => (
            <SidebarItem key={conversation._id} conversation={conversation} />
          ))}
        </List>
      )}
    </Box>
  );
};

export default SidebarList;
