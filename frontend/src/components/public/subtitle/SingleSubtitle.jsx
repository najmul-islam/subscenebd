import { useNavigate, useParams } from "react-router-dom";
import {
  useCountDownloadSubtitleMutation,
  useDisLikeSubtitleMutation,
  useGetSubtitleQuery,
  useLikeSubtitleMutation,
} from "../../../features/subtitle/subtitleApi";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Chip,
  Container,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ThumbUp,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbDown,
  Download,
  FiberManualRecord,
} from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  usePutFollowerMutation,
  usePutUserDownloadSubMutation,
} from "../../../features/user/userApi";
import { useRef, useState } from "react";
import Comments from "./CommentList";
import AboutSubtitle from "./AboutSubtitle";
import ReleaseInfo from "./ReleaseInfo";
import UserInfo from "./UserInfo";
import ActionButtons from "./ActionButtons";

const img_url = process.env.REACT_APP_IMG_API;
const avatar_url = process.env.REACT_APP_AVATAR_URL;

const SingleSubtitle = () => {
  const { user } = useSelector((state) => state.auth);
  // const {data } = useDownloadSubtitleQuery()
  const [putUserDownloadSub] = usePutUserDownloadSubMutation();
  const [putFollower] = usePutFollowerMutation();
  const [likeSubtitle] = useLikeSubtitleMutation();
  const [dislikeSubtitle] = useDisLikeSubtitleMutation();
  const [countDownload] = useCountDownloadSubtitleMutation();

  const { subtitleId } = useParams();
  const navigate = useNavigate();

  const {
    data: subtitle,
    isLoading,
    isError,
    error,
  } = useGetSubtitleQuery(subtitleId);

  const handleFollow = (userId) => {
    if (user) {
      putFollower(userId);
    } else {
      navigate("/login");
    }
  };

  const handleLike = (subtitleId) => {
    if (user) {
      likeSubtitle(subtitleId);
    } else {
      navigate("/login");
    }
  };

  const handleDislike = (subtitleId) => {
    if (user) {
      dislikeSubtitle(subtitleId);
    } else {
      navigate("/login");
    }
  };

  const handleDownload = (subtitleId) => {
    countDownload(subtitleId);
    if (user) {
      putUserDownloadSub(subtitleId);
    }
  };

  const handleUsername = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleGenres = (genre) => {
    navigate(`/subtitles/genres/${genre}`);
  };

  if (isLoading) return <h1>Loading...</h1>;

  console.log("single subtitle", subtitle);
  console.log("single user", user);

  return (
    <>
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          marginBottom={2}
        >
          {/* movie poster */}

          <Card
            component="a"
            href={`${img_url}/${subtitle?.poster_path}`}
            target="_blank"
            sx={{
              width: "200px",
              // width: { xs: "100%", sm: "200px" },
              boxShadow: "none",
              position: "relative",
              margin: { xs: "0 auto", sm: "0" },
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={`${img_url}/${subtitle?.poster_path}`}
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
              {subtitle?.release_type}
            </Typography>
          </Card>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {/* title */}
            <Box>
              <Typography variant="h6">
                {subtitle?.title} ({subtitle?.release_date})
              </Typography>
              <Typography variant="caption">
                Uploaded {moment(subtitle.createdAt).format("MMM D, YYYY")}
              </Typography>
              {/* genres */}
              <Stack direction="row" spacing={1} marginY={1} marginTop={2}>
                {subtitle?.genres.map((genre, i) => (
                  <Chip
                    key={i}
                    variant="outlined"
                    label={genre}
                    size="small"
                    onClick={() => handleGenres(genre?.toLowerCase())}
                    sx={{ borderRadius: "5px" }}
                  />
                ))}
              </Stack>

              {/* user info */}
              <UserInfo subtitle={subtitle} />
            </Box>

            {/* download like dislike*/}

            <ActionButtons subtitle={subtitle} />
          </Box>
        </Stack>
      </Container>

      <Container>
        <ReleaseInfo releaseName={subtitle?.release_name} />
        <AboutSubtitle description={subtitle?.description} />
        <Comments subtitle={subtitle} />
      </Container>
    </>
  );
};
export default SingleSubtitle;
