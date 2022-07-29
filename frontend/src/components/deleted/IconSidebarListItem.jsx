import { useHeader } from "../../contexts/HeaderContext";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const IconSidebarListItem = ({ link, icon, text }) => {
  const { selectedUrl, handleListItemClick, toggleSidebar } = useHeader();
  const navigate = useNavigate();

  return (
    <>
      <ListItem onClick={() => navigate(link)} disablePadding>
        <ListItemButton
          selected={selectedUrl === link}
          onClick={(event) => handleListItemClick(event, link)}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {/* <ListItemText primary={text} /> */}
          {toggleSidebar ? null : <ListItemText primary={text} />}
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default IconSidebarListItem;
