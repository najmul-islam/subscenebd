import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { toggleUserSearchFocus } from "../../../../features/theme/themeSlice";
import { userSearch } from "../../../../features/user/userSlice";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const SearchedList = ({ searchUsers }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserItem = (userId) => {
    navigate(`/messages/${userId}`);
    dispatch(toggleUserSearchFocus(false));
    dispatch(userSearch(""));
  };

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
              <Avatar src={user?.avatar} />
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
