import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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

const SidebarList = () => {
  const [selectedIndex, setSelectedIndex] = useState(window.location.pathname);
  const navigate = useNavigate();

  const handleListItemClick = (event, url) => {
    setSelectedIndex(url);
  };

  return (
    <>
      <List aria-label="main mailbox folders">
        <ListItem onClick={() => navigate("/latest")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/latest"}
            onClick={(event) => handleListItemClick(event, "/latest")}
          >
            <ListItemIcon>
              <AccessTimeOutlined />
            </ListItemIcon>
            <ListItemText>Latest</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/popular")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/popular"}
            onClick={(event) => handleListItemClick(event, "/popular")}
          >
            <ListItemIcon>
              <BarChartOutlined />
            </ListItemIcon>
            <ListItemText>Popular</ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem onClick={() => navigate("/all")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/all"}
            onClick={(event) => handleListItemClick(event, "/all")}
          >
            <ListItemIcon>
              <VideoLibraryOutlined />
            </ListItemIcon>
            <ListItemText>All</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/movies")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/movies"}
            onClick={(event) => handleListItemClick(event, "/movies")}
          >
            <ListItemIcon>
              <MovieOutlined />
            </ListItemIcon>
            <ListItemText>Movies</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/series")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/series"}
            onClick={(event) => handleListItemClick(event, "/series")}
          >
            <ListItemIcon>
              <SmartDisplayOutlined />
            </ListItemIcon>
            <ListItemText>TV-Series</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/short-films")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/short-films"}
            onClick={(event) => handleListItemClick(event, "/short-films")}
          >
            <ListItemIcon>
              <MovieFilterOutlined />
            </ListItemIcon>
            <ListItemText>Short Films</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/musics")} disablePadding>
          <ListItemButton
            selected={selectedIndex === "/musics"}
            onClick={(event) => handleListItemClick(event, "/musics")}
          >
            <ListItemIcon>
              <MusicVideoOutlined />
            </ListItemIcon>
            <ListItemText>Music Videos</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default SidebarList;
