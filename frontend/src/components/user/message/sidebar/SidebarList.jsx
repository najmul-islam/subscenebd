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
} from "@mui/material";

import {
  AccessTimeOutlined,
  BarChartOutlined,
  VideoLibraryOutlined,
  MovieOutlined,
  SmartDisplayOutlined,
  MovieFilterOutlined,
  MusicVideoOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";

const SidebarList = () => {
  const [list, setList] = useState("latest");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleList = (e, newList) => {
    setList(newList);
  };

  return (
    <Box>
      <Typography variant="h5" paddingY={2} marginLeft={2} fontWeight={700}>
        Chats
      </Typography>

      <SearchBox />

      <List sx={{ paddingTop: "0" }}>
        <ListItem>
          <ListItemAvatar sx={{ width: "50px", height: "50px" }}>
            <Avatar sx={{ width: "50px", height: "50px" }} />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
            }
          />
        </ListItem>
        {/* <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography noWrap>
                Brunch this weekend Brunch this weekend
              </Typography>
            }
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
            }
          />
        </ListItem> */}
      </List>
    </Box>
  );
};

export default SidebarList;
