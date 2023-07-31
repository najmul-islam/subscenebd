import React, { useState } from "react";
import moment from "moment";
import {
  Card,
  CardMedia,
  Grid,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DownloadRounded,
  AccessTimeRounded,
  BookmarkAdded,
  BookmarkAddOutlined,
} from "@mui/icons-material";
import wordsToNumbers from "words-to-numbers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubtitle,
  removeSubtitle,
} from "../../../features/subtitle/subtitleSlice";

const img_url = process.env.REACT_APP_IMG_API;

const SubtitleItem = ({ subtitle }) => {
  const { user } = useSelector((state) => state.auth);
  const { subtitles } = useSelector((state) => state.subtitles);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // format number
  const formatNumber = (number = 0) => {
    if (Math.abs(number) >= 1e9) {
      return (number / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (Math.abs(number) >= 1e6) {
      return (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (Math.abs(number) >= 1e3) {
      return (number / 1e3).toFixed(2).replace(/\.0$/, "") + "K";
    }
    return number.toString();
  };

  // format season -> word to number
  const formatSeason = (title) => {
    return wordsToNumbers(title?.split("-")[1].split(" ")[1]);
  };

  // handle bookmark
  const handleAddBookmark = () => {
    if (user) {
      dispatch(addSubtitle(subtitle));
    } else {
      navigate("/login");
    }
  };

  const handleRemoveBookmark = () => {
    if (user) {
      dispatch(removeSubtitle(subtitle));
    } else {
      navigate("/login");
    }
  };

  const isSubtitleBookmarked = subtitles.some(
    (bookmarkSub) => bookmarkSub._id === subtitle._id
  );

  return (
    <Grid item>
      <Card
        sx={{
          width: { xs: "138px", sm: "160px" },
          transition: "transform 0.3s",
          zIndex: "1",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            padding: "0px 3px",
            background: "#0000006f",
          }}
        >
          {subtitle?.release_date}
        </Typography>

        <Tooltip
          title={
            isSubtitleBookmarked ? "Remove form bookmarks" : "Add to bookmarks"
          }
        >
          <IconButton
            sx={{
              fontSize: "20px",
              position: "absolute",
              right: "0",
              top: "0",
              padding: "1px",
              background: "#0000006f",
              color: "#ffffff",
              borderRadius: "0px",
            }}
            onClick={
              isSubtitleBookmarked ? handleRemoveBookmark : handleAddBookmark
            }
          >
            {isSubtitleBookmarked ? (
              <BookmarkAdded fontSize="20px" />
            ) : (
              <BookmarkAddOutlined fontSize="20px" />
            )}
          </IconButton>
        </Tooltip>

        {/* {subtitle?.media_type === "series" ? (
          <Typography
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              padding: "0px 3px",
              background: "#0000006f",
            }}
            title={subtitle?.title.split("-")[1]}
          >
            S-{formatSeason(subtitle?.title)}
          </Typography>
        ) : null} */}

        {/* subtile poster */}
        <Box component={Link} to={`/subtitles/${subtitle?._id}`}>
          <CardMedia
            component="img"
            image={`${img_url}${subtitle?.poster_path}`}
            // sx={{ height: "200px" }}
            alt={subtitle?.title}
          />
        </Box>
        <Box position="relative">
          {/* title */}
          <Box
            component={Link}
            to={`/subtitles/${subtitle?._id}`}
            sx={{ textDecoration: "none", color: "#000000" }}
          >
            <Typography
              variant="subtitle2"
              paddingX="3px"
              noWrap
              title={subtitle?.title}
            >
              {subtitle?.title}
            </Typography>
          </Box>

          {/* traslator name */}
          <Box
            component={Link}
            to={`/user/${subtitle.user._id}`}
            sx={{ textDecoration: "none", color: "#000000" }}
          >
            <Typography
              variant="subtitle2"
              paddingX="5px"
              fontSize={12}
              // fontWeight={500}
              noWrap
            >
              {subtitle?.user?.name}
            </Typography>
          </Box>

          {/* downloaded & time */}
          <Box
            sx={{
              paddingX: "3px",
              paddingBottom: "3px",
              fontSize: "13px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              title={`${subtitle?.downloads} time downloads`}
            >
              <DownloadRounded sx={{ fontSize: "13px", marginRight: "3px" }} />
              {formatNumber(subtitle?.downloads)}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              noWrap
            >
              <AccessTimeRounded
                sx={{ fontSize: "13px", marginRight: "3px" }}
              />
              {moment(subtitle.createdAt).startOf("m").fromNow()}
            </Box>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};

export default SubtitleItem;
