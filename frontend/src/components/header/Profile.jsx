import React, { useState } from "react";
import useColorMode from "../../hooks/ColorModeHook";
import HeaderListItem from "./HeaderListItem";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

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
  BookmarksOutlined,
  NightlightRoundOutlined,
  LightModeOutlined,
} from "@mui/icons-material";
// import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
const Profile = () => {
  const { mode, toggleColor } = useColorMode();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);
  const { user, reset } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Avatar
          alt={user.name.toUpperCase()}
          src="/static/images/avatar/2.jpg"
        />
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
            <Avatar
              alt={user.name.toUpperCase()}
              src="/static/images/avatar/2.jpg"
            />
            <ListItemText sx={{ ml: 2 }}>{user.name}</ListItemText>
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
          <ListItemButton onClick={onLogout}>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <ExitToAppOutlined />
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={toggleColor}>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              {mode === "dark" ? (
                <LightModeOutlined />
              ) : (
                <NightlightRoundOutlined />
              )}
            </ListItemIcon>
            <ListItemText>
              {mode === "dark" ? "Light Mode" : "Dark Mode"}
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Menu>
    </>
  );
};

export default Profile;
