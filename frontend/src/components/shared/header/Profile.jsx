import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { toggleColor } from "../../../features/theme/themeSlice";
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
  Badge,
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
import { apiSlice } from "../../../features/api/apiSlice";

const Profile = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);

  // const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(apiSlice.util.resetApiState());
    dispatch(logout());
    navigate("/");
  };

  const handleColor = () => {
    dispatch(toggleColor(mode));
  };

  const invisible = true;

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Badge color="error" variant="dot" invisible={invisible}>
          <Avatar alt={user?.name?.toLowerCase()} src={user?.avatar} />
        </Badge>
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
            paddingTop: "0",
            paddingBottom: "0",
            background: (theme) => theme.palette.background.secondery,
          },
        }}
        sx={{ paddingTop: "0", paddingBottom: "0" }}
      >
        <ListItem
          onClick={() => navigate("/user/profile")}
          disablePadding
          sx={{
            paddingTop: "0",
            paddingBottom: "0",
          }}
        >
          <ListItemButton>
            <Avatar alt={user?.name?.toLowerCase()} src={user?.avatar} />
            <ListItemText sx={{ ml: 2 }}>{user?.name}</ListItemText>
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
          link="/messages"
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
          <ListItemButton onClick={handleColor}>
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
