import moment from "moment";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
} from "@mui/material";
import {
  BookmarkAdded,
  BookmarkAddOutlined,
  FiberManualRecord,
} from "@mui/icons-material";
import wordsToNumbers from "words-to-numbers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubtitle,
  removeSubtitle,
} from "../../../features/subtitle/subtitleSlice";

const img_url = process.env.REACT_APP_IMG_API;
const avatar_url = process.env.REACT_APP_AVATAR_URL;
const SearchSubtitleItem = ({ subtitle }) => {
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
    <Box width={{ xs: "100%", sm: "520px" }}>
      <Card
        sx={{
          transition: "transform 0.3s",
          zIndex: "1",
          position: "relative",
          boxShadow: "0",
        }}
      >
        {/* subtile poster */}
        <Stack direction="row" spacing={2}>
          <Box
            component={Link}
            to={`/subtitles/${subtitle?._id}`}
            sx={{ position: "relative" }}
          >
            <CardMedia
              component="img"
              image={`${img_url}${subtitle?.poster_path}`}
              sx={{ width: "150px", borderRadius: "5px" }}
              alt={subtitle?.title}
            />
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
                isSubtitleBookmarked
                  ? "Remove form bookmarks"
                  : "Add to bookmarks"
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
                  isSubtitleBookmarked
                    ? handleRemoveBookmark
                    : handleAddBookmark
                }
              >
                {isSubtitleBookmarked ? (
                  <BookmarkAdded fontSize="20px" />
                ) : (
                  <BookmarkAddOutlined fontSize="20px" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Box position="relative">
            {/* title */}
            <Box
              component={Link}
              to={`/subtitles/${subtitle?._id}`}
              sx={{
                textDecoration: "none",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              <Typography
                fontSize={18}
                fontWeight={400}
                title={subtitle?.title}
              >
                {subtitle?.title}
              </Typography>
            </Box>

            {/* downloaded & time */}
            <Stack
              direction="row"
              spacing={1}
              marginBottom={2}
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                fontSize={12}
                display="flex"
                alignItems="center"
              >
                {formatNumber(subtitle?.downloads)} downloads
              </Typography>
              <FiberManualRecord
                sx={{
                  fontSize: "5px",
                  color: (theme) => theme.palette.text.secondary,
                }}
              />
              <Typography
                variant="subtitle1"
                fontSize={12}
                display="flex"
                alignItems="center"
              >
                {moment(subtitle.createdAt).startOf("m").fromNow()}
              </Typography>
            </Stack>
            {/* traslator name */}
            <Box
              component={Link}
              to={`/user/${subtitle.user._id}`}
              marginBottom={2}
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              <Avatar
                alt={subtitle?.user.name}
                src={subtitle?.user.avatar}
                sx={{ width: "24px", height: "24px", marginRight: "5px" }}
              />
              <Typography
                variant="subtitle2"
                fontSize={12}
                fontWeight={400}
                noWrap
              >
                {subtitle?.user?.name}
              </Typography>
            </Box>

            {/* description */}
            <Box>
              <Typography variant="body2">{subtitle?.description}</Typography>
            </Box>
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default SearchSubtitleItem;
