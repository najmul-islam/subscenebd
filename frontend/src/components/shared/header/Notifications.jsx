import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  useEditNotificationsMutation,
  useGetNotificationsQuery,
} from "../../../features/notification/notificationApi";

import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
  Tooltip,
  Badge,
  Avatar,
  Box,
  Stack,
  styled,
} from "@mui/material";

import {
  CommentOutlined,
  Notifications as NotificationsIcon,
  NotificationsNone,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";

const avatar_url = process.env.REACT_APP_AVATAR_URL;
const img_url = process.env.REACT_APP_IMG_API;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Notifications = () => {
  // const [notifications, setNotificatios] = useState([]);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const open = Boolean(anchorElNotifications);

  const navigate = useNavigate();
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useGetNotificationsQuery();
  const [editNotification] = useEditNotificationsMutation();

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
    editNotification();
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleMenuItem = ({ type, id }) => {
    navigate(`/${type}/${id}`);
  };

  const generateNotificationMessage = (action) => {
    let message = "";

    switch (action) {
      case "likePost":
        message = "likes your post";
        break;
      case "commentPost":
        message = "commented on your post";
        break;
      case "likeSubtitle":
        message = "likes your subtitle";
        break;
      case "commentSubtitle":
        message = "commented on your subtitle";
        break;
      case "dislikeSubtitle":
        message = "dislikes your subtitle";
        break;
      default:
        message = "performed an action on your content"; // Default message
        break;
    }

    return message;
  };
  return (
    <>
      <Tooltip title="Notification">
        <IconButton onClick={handleOpenNotificationsMenu}>
          <StyledBadge
            color="error"
            badgeContent={
              notifications?.filter((notification) => !notification.seen).length
            }
            max={9}
          >
            {open ? (
              <NotificationsIcon sx={{ fontSize: "25px" }} />
            ) : (
              <NotificationsNone sx={{ fontSize: "25px" }} />
            )}
          </StyledBadge>
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
            width: "420px",
            height: "600px",
          },
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
            Notifications
          </Typography>
        </Box>

        <Divider />
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          notifications?.map((notification) => (
            <MenuItem
              key={notification._id}
              onClick={() =>
                handleMenuItem(
                  notification?.subtitle
                    ? { type: "subtitles", id: notification?.subtitle._id }
                    : { type: "posts", id: notification?.post._id }
                )
              }
            >
              <Stack
                direction="row"
                spacing={1}
                display="flex"
                alignItems="center"
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    notification?.action === "likeSubtitle" ||
                    notification?.action === "likePost" ? (
                      <Avatar
                        sx={{
                          width: "20px",
                          height: "20px",
                          padding: "5px",
                          background: (theme) =>
                            theme.palette.background.secondary,
                        }}
                      >
                        <ThumbUpOutlined
                          sx={{
                            width: "14px",
                            height: "14px",
                            color: (theme) => theme.palette.text.primary,
                          }}
                        />
                      </Avatar>
                    ) : notification?.action === "dislikeSubtitle" ? (
                      <Avatar
                        sx={{
                          width: "20px",
                          height: "20px",
                          padding: "5px",
                          background: (theme) =>
                            theme.palette.background.secondary,
                        }}
                      >
                        <ThumbDownOutlined
                          sx={{
                            width: "14px",
                            height: "14px",
                            color: (theme) => theme.palette.text.primary,
                          }}
                        />
                      </Avatar>
                    ) : notification?.action === "commentSubtitle" ||
                      notification?.action === "commentPost" ? (
                      <Avatar
                        sx={{
                          width: "20px",
                          height: "20px",
                          padding: "5px",
                          background: (theme) =>
                            theme.palette.background.secondary,
                        }}
                      >
                        <CommentOutlined
                          sx={{
                            width: "14px",
                            height: "14px",
                            color: (theme) => theme.palette.text.primary,
                          }}
                        />
                      </Avatar>
                    ) : null
                  }
                >
                  <Avatar
                    alt={notification?.sender.name}
                    src={`${avatar_url}/${notification.sender.avatar}`}
                    sx={{ width: 48, height: 48 }}
                  />
                </Badge>
                <Box>
                  <Typography
                    sx={{ overflowWrap: "break-word", whiteSpace: "pre-line" }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {notification.sender.name}
                    </span>{" "}
                    {generateNotificationMessage(notification.action)} :{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {" "}
                      {notification?.subtitle
                        ? notification?.subtitle?.title
                        : notification?.post?.title}
                    </span>
                  </Typography>
                  <Typography variant="body2" fontSize={12} marginTop={1}>
                    {moment(notification.createdAt).startOf("m").fromNow()}
                  </Typography>
                </Box>

                <img
                  alt={
                    notification?.subtitle
                      ? `${notification?.subtitle.title}`
                      : `${notification?.post.title}`
                  }
                  src={
                    notification?.subtitle
                      ? `${img_url}/${notification?.subtitle.poster_path}`
                      : `${img_url}/${notification?.post.poster_path}`
                  }
                  width="50px"
                  style={{ borderRadius: "5px" }}
                />
              </Stack>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default Notifications;
