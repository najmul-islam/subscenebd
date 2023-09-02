// import useHeader from "../../../hooks/HeaderHook";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleListitem } from "../../../features/theme/themeSlice";

const SidebarListItem = ({ link, icon, text, ...props }) => {
  const { selectedUrl } = useSelector((state) => state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListItem = (link) => {
    navigate(link);
    dispatch(toggleListitem(link));
  };

  return (
    <>
      <ListItem onClick={() => handleListItem(link)} disablePadding>
        <ListItemButton
          selected={selectedUrl === link}
          sx={{ borderRadius: "10px" }}
        >
          <ListItemIcon sx={{ minWidth: "30px" }}>{icon}</ListItemIcon>
          <ListItemText {...props}>{text}</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarListItem;
