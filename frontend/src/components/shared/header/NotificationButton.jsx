import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  notificationApi,
  useGetNotificationsQuery,
  useReadNotificationMutation,
  useSeenNotificationsMutation,
} from "../../../features/notification/notificationApi";

import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";

import {
  Circle,
  CommentOutlined,
  ThumbDownOutlined,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";
import NotificationSkeleton from "../skeleton/NotificationSkeleton";
const img_url = process.env.REACT_APP_IMG_API;

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const NotificationButton = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // const [notifications, setNotificatios] = useState([]);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const open = Boolean(anchorElNotifications);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isLoading = true;
  const { data, isLoading, isError, error } = useGetNotificationsQuery();
  const [seenNotification] = useSeenNotificationsMutation();
  const [readNotification] = useReadNotificationMutation();

  const handleOpenNotificationsMenu = (event) => {
    setAnchorElNotifications(event.currentTarget);
    seenNotification();
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotifications(null);
  };

  const handleMenuItem = ({ type, subtitleId, notificationId }) => {
    navigate(`/${type}/${subtitleId}`);
    readNotification(notificationId);
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

  // infinit scroll
  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      dispatch(notificationApi.endpoints.getMoreNotifications.initiate(page));
    }
  }, [dispatch, page]);

  useEffect(() => {
    if (data?.total > 0) {
      const more = Math.ceil(data?.total / Number(10)) > page;
      setHasMore(more);
    }
  }, [data, page]);

  return (
    <>
      <Tooltip title="Notification">
        <IconButton
          onClick={handleOpenNotificationsMenu}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          <StyledBadge
            color="error"
            badgeContent={data?.unseenNotificatons}
            max={9}
          >
            {open ? (
              <IoNotificationsSharp style={{ fontSize: "25px" }} />
            ) : (
              <IoNotificationsOutline style={{ fontSize: "25px" }} />
            )}
          </StyledBadge>
        </IconButton>
      </Tooltip>

      {isLoading ? (
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

          {[...Array(10)].map((notification, i) => (
            <MenuItem key={i}>
              <NotificationSkeleton />
            </MenuItem>
          ))}
        </Menu>
      ) : data?.notifications?.length === 0 ? (
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
          {/* <MenuItem textAlign="center">
            You have no notification right now
          </MenuItem> */}

          <Typography variant="h6" textAlign="center" paddingY={4}>
            You have no notification right now
          </Typography>
        </Menu>
      ) : (
        <Menu
          anchorEl={anchorElNotifications}
          keepMounted
          open={open}
          onClose={handleCloseNotificationsMenu}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          PaperProps={{
            id: "scrollableDiv",
            sx: {
              width: "440px",
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

          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={
              data?.notifications?.length ? data?.notifications?.length : 10
            }
            next={fetchMore}
            hasMore={hasMore}
            loader={[...Array(3)].map((notification, i) => (
              <MenuItem key={i}>
                <NotificationSkeleton />
              </MenuItem>
            ))}
            endMessage={
              <Typography
                variant="subtitle2"
                paddingY={2}
                sx={{ textAlign: "center" }}
              >
                You have seen it all
              </Typography>
            }
          >
            {data?.notifications?.map((notification) => (
              <MenuItem
                key={notification?._id}
                onClick={() =>
                  handleMenuItem(
                    notification?.subtitle
                      ? {
                          type: "subtitles",
                          subtitleId: notification?.subtitle._id,
                          notificationId: notification?._id,
                        }
                      : {
                          type: "posts",
                          subtitleId: notification?.post._id,
                          notificationId: notification?._id,
                        }
                  )
                }
              >
                <Stack
                  direction="row"
                  spacing={1}
                  display="flex"
                  alignItems="center"
                >
                  {notification?.read ? (
                    <Box component="span" width="7px" height="7px"></Box>
                  ) : (
                    <Circle
                      sx={{ width: "5px", height: "5px", color: "#3E88FC" }}
                    />
                  )}

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
                      src={notification?.sender?.avatar}
                      sx={{ width: 48, height: 48 }}
                    />
                  </Badge>
                  <Box>
                    <Typography
                      sx={{
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <span style={{ fontWeight: "bold" }}>
                        {notification?.sender.name}
                      </span>{" "}
                      {generateNotificationMessage(notification?.action)} :{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {notification?.subtitle
                          ? notification?.subtitle?.title
                          : notification?.post?.title}
                      </span>
                    </Typography>
                    <Typography variant="body2" fontSize={12} marginTop={1}>
                      {moment(notification?.createdAt).startOf("m").fromNow()}
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
                        ? `${img_url}${notification?.subtitle.poster_path}`
                        : `${img_url}${notification?.post.poster_path}`
                    }
                    width="50px"
                    style={{ borderRadius: "5px" }}
                  />
                </Stack>
              </MenuItem>
            ))}
          </InfiniteScroll>
        </Menu>
      )}
    </>
  );
};

export default NotificationButton;
