import React, { useState } from "react";
import { useHeader } from "../../contexts/HeaderContext";
import { useNavigate } from "react-router-dom";
import HeaderListItem from "./HeaderListItem";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";

import {
  AccountCircleOutlined,
  SubtitlesOutlined,
  EmailOutlined,
  FileDownloadOutlined,
  ExitToAppOutlined,
  NightlightRoundOutlined,
  BookmarksOutlined,
} from "@mui/icons-material";

const Profile = () => {
  const { selectedUrl, handleListItemClick } = useHeader();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const open = Boolean(anchorElUser);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorElUser}
        keepMounted
        open={open}
        onClose={handleCloseUserMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: "300px",
          },
        }}
      >
        <ListItem disablePadding>
          <ListItemButton>
            <Avatar />
            <ListItemText sx={{ ml: 2 }}> Najmul Islam</ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />
        <HeaderListItem
          link="/user/profile"
          icon={<AccountCircleOutlined />}
          text="Profile"
        />

        <ListItem onClick={() => navigate("/user/profile")} disablePadding>
          <ListItemButton
            selected={selectedUrl === "/user/profile"}
            onClick={(event) => handleListItemClick(event, "/user/profile")}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/user/subtitles")} disablePadding>
          <ListItemButton
            selected={selectedUrl === "/user/subtitles"}
            onClick={(event) => handleListItemClick(event, "/user/subtitles")}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <SubtitlesOutlined />
            </ListItemIcon>
            <ListItemText>Subtitles</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/user/messages")} disablePadding>
          <ListItemButton
            selected={selectedUrl === "/user/messages"}
            onClick={(event) => handleListItemClick(event, "/user/messages")}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <EmailOutlined />
            </ListItemIcon>
            <ListItemText>Messages</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/user/bookmarks")} disablePadding>
          <ListItemButton
            selected={selectedUrl === "/user/bookmarks"}
            onClick={(event) => handleListItemClick(event, "/user/bookmarks")}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <BookmarksOutlined />
            </ListItemIcon>
            <ListItemText>Bookmarks</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/user/downloads")} disablePadding>
          <ListItemButton
            selected={selectedUrl === "/user/downloads"}
            onClick={(event) => handleListItemClick(event, "/user/downloads")}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <FileDownloadOutlined />
            </ListItemIcon>
            <ListItemText>Downloads</ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem onClick={() => navigate("/user/signout")} disablePadding>
          <ListItemButton
            selected={selectedUrl === "/user/signout"}
            onClick={(event) => handleListItemClick(event, "/user/signout")}
          >
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <ExitToAppOutlined />
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <NightlightRoundOutlined />
            </ListItemIcon>
            <ListItemText>Appearance</ListItemText>
          </ListItemButton>
        </ListItem>
      </Menu>
    </>
  );
};

export default Profile;
