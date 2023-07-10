// import useHeader from "../../../hooks/HeaderHook";
import { useNavigate, Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleListitem } from "../../../features/theme/themeSlice";

const SidebarListItem = ({ link, icon, text }) => {
  // const { selectedUrl, handleListItemClick } = useHeader();
  const { selectedUrl } = useSelector((state) => state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListItem = (link) => {
    dispatch(toggleListitem(link));
  };

  return (
    <>
      <ListItem component={Link} to={link} disablePadding>
        <ListItemButton
          selected={selectedUrl === link}
          onClick={() => handleListItem(link)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{text}</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarListItem;
