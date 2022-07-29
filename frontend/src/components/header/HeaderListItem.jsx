import { useHeader } from "../../contexts/HeaderContext";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const HeaderListItem = ({ link, icon, text }) => {
  const { selectedUrl, handleListItemClick } = useHeader();
  const navigate = useNavigate();
  return (
    <ListItem onClick={() => navigate(link)} disablePadding>
      <ListItemButton
        selected={selectedUrl === link}
        onClick={(event) => handleListItemClick(event, link)}
      >
        <ListItemIcon sx={{ minWidth: "35px" }}>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default HeaderListItem;
