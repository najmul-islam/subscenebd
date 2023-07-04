import { useHeader } from "../../contexts/HeaderContext";
import { useNavigate } from "react-router-dom";
import { toggleListitem } from "../../features/theme/themeSlice";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const IconSidebarListItem = ({ link, icon, text }) => {
  // const { selectedUrl, handleListItemClick, toggleSidebar } = useHeader();
  const { sidebar } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListItem = (link) => {
    dispatch(toggleListitem(link));
  };

  return (
    <>
      <ListItem onClick={() => navigate(link)} disablePadding>
        <ListItemButton
          // selected={selectedUrl === link}
          onClick={() => handleListItem(link)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {/* <ListItemText primary={text} /> */}
          {sidebar ? null : <ListItemText primary={text} />}
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default IconSidebarListItem;
