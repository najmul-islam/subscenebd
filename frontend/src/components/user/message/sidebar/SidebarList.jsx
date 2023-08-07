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

const SidebarList = () => {
  const [searchUsers, setSearchUsers] = useState([]);
  const { isUserSearchFocus } = useSelector((state) => state.theme);
  const { searchUserQuery } = useSelector((state) => state.users);

  // const { user } = useSelector((state) => state.auth);
  const {
    data: conversations,
    isLoading,
    isError,
  } = useGetConversationsQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
