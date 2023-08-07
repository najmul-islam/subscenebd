import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useId } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { conversationApi } from "../../../../features/conversations/conversationApi";
const avatar_url = process.env.REACT_APP_AVATAR_URL;

const SearchedList = ({ searchUsers }) => {
  const [userId, setUserId] = useState("");
  const [conversations, setConversations] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserItem = (userId) => {
    // setUserId(userId);
    console.log("userId", userId);
    navigate(`/messages/${userId}`);
  };

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(conversationApi.endpoints.getConversations.initiate(userId))
  //       .unwrap()
  //       .then((data) => setConversations(data));
  //   }
  // }, [dispatch, userId]);

  // console.log(conversations);
  return (
    <List>
      {searchUsers?.map((user) => (
        <ListItem
          key={user._id}
          disableGutters
          disablePadding
          onClick={() => handleUserItem(user._id)}
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar src={`${avatar_url}/${user?.avatar}`} />
            </ListItemAvatar>
            <ListItemText>
              <Typography>{user?.name}</Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default SearchedList;
