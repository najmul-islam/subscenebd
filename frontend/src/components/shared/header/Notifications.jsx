import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";

import {
  Notifications as NotificationsIcon,
  NotificationsNone,
} from "@mui/icons-material";

const Notifications = () => {
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const open = Boolean(anchorElNotifications);

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };
  return (
    <>
      <Tooltip title="Notification">
        <IconButton onClick={handleOpenNotificationsMenu}>
          {open ? (
            <NotificationsIcon sx={{ fontSize: "25px" }} />
          ) : (
            <NotificationsNone sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElNotifications}
        keepMounted
        open={open}
        onClose={handleCloseNotificationsMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: "400px",
          },
        }}
      >
        <Typography variant="h6" sx={{ px: 2, py: 1 }}>
          Notifications
        </Typography>

        <Divider />
        <MenuItem>
          <Typography variant="inherit" noWrap>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            in.
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Notifications;
