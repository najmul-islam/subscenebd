import React, { useState } from "react";
import { useHeader } from "../../contexts/HeaderContext";
import { useNavigate } from "react-router-dom";
import HeaderListItem from "./HeaderListItem";
import {
  Avatar,
  Menu,
  IconButton,
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
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);

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
        <HeaderListItem
          link="/user/subtitles"
          icon={<SubtitlesOutlined />}
          text="Subtitles"
        />

        <HeaderListItem
          link="/user/messages"
          icon={<EmailOutlined />}
          text="Messages"
        />

        <HeaderListItem
          link="/user/bookmarks"
          icon={<BookmarksOutlined />}
          text="Bookmarks"
        />
        <HeaderListItem
          link="/user/downloads"
          icon={<FileDownloadOutlined />}
          text="Downloads"
        />

        <ListItem disablePadding>
          <ListItemButton>
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
