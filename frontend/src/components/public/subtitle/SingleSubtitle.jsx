import { useNavigate, useParams } from "react-router-dom";
import {
  useCountDownloadSubtitleMutation,
  useDisLikeSubtitleMutation,
  useDownloadSubtitleQuery,
  useGetSubtitleQuery,
  useLikeSubtitleMutation,
} from "../../../features/subtitle/subtitleApi";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AccessTimeRounded,
  ThumbUp,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbDown,
  Download,
  FiberManualRecord,
} from "@mui/icons-material";
import moment from "moment";
import { useSelector } from "react-redux";
import { usePutFollowerMutation } from "../../../features/user/userApi";

const img_url = process.env.REACT_APP_IMG_API;
const avatar_url = process.env.REACT_APP_AVATAR_URL;

const SingleSubtitle = () => {
  const { user } = useSelector((state) => state.auth);
  // const {data } = useDownloadSubtitleQuery()
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

              <Stack
                direction="row"
                spacing={1}
                marginTop={3}
                alignItems="center"
              >
                <Avatar
                  alt={subtitle?.user.name}
                  src={`${avatar_url}/${subtitle?.user.avatar}`}
                  variant="rounded"
                  sx={{ width: "40px", height: "40px", cursor: "pointer" }}
                  onClick={() => handleUsername(subtitle?.user._id)}
                />
                <Stack direction="column">
                  <Box alignContent="center">
                    <Typography
                      onClick={() => handleUsername(subtitle?.user._id)}
                      component="span"
                      variant="subtitle2"
                      sx={{ cursor: "pointer" }}
                    >
                      {subtitle?.user.name}
                    </Typography>
                    {user?._id !== subtitle?.user._id && (
                      <>
                        <FiberManualRecord
                          sx={{
                            fontSize: "5px",
                            marginBottom: "2px",
                            marginX: "2px",
                          }}
                        />
                        <Typography
                          component="span"
                          variant="subtitle2"
                          sx={{ color: "#1976D2", cursor: "pointer" }}
                          onClick={() => handleFollow(subtitle?.user._id)}
                        >
                          {subtitle?.user.followers.includes(user?._id)
                            ? "Following"
                            : "Follow"}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Typography variant="caption">
                    {subtitle?.user.followers.length >= 2
                      ? `${subtitle?.user.followers.length} followers`
                      : `${subtitle?.user.followers.length} follower`}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            {/* download like dislike*/}
            <Box>
              <Stack direction="row" spacing={2} marginTop="25px">
                <Tooltip title="download subtitle">
                  <Button
                    size="small"
                    variant="contained"
                    download
                    startIcon={<Download />}
                    href={`${avatar_url}/${subtitle?.subtitle_link}`}
                    onClick={() => handleDownload(subtitle?._id)}
                  >
                    Download
                  </Button>
                </Tooltip>

                <Tooltip title="downloaded">
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{ cursor: "default" }}
                  >
                    {subtitle?.downloads}
                  </Button>
                </Tooltip>

                <Tooltip title="like subtitle">
                  <Button
                    onClick={() => handleLike(subtitle?._id)}
                    variant="outlined"
                    startIcon={
                      subtitle?.likes.includes(user?._id) ? (
                        <ThumbUp />
                      ) : (
                        <ThumbUpAltOutlined />
                      )
                    }
                  >
                    {subtitle?.likes.length}
                  </Button>
                </Tooltip>

                <Tooltip title="dislike subtitle">
                  <Button
                    onClick={() => handleDislike(subtitle?._id)}
                    variant="outlined"
                    startIcon={
                      subtitle?.dislikes.includes(user?._id) ? (
                        <ThumbDown />
                      ) : (
                        <ThumbDownAltOutlined />
                      )
                    }
                  >
                    {subtitle?.dislikes.length}
                  </Button>
                </Tooltip>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>

      <Container>
        <Box
          minHeight="200px"
          sx={{ maxWidth: "100%", overflow: "hidden", whiteSpace: "normal" }}
        >
          <Divider
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            Release info
          </Divider>

          {subtitle?.release_name.map((name, id) => (
            <Typography variant="body2" key={id}>
              {name}
            </Typography>
          ))}
        </Box>

        <Box
          minHeight="200px"
          sx={{ maxWidth: "100%", overflow: "hidden", whiteSpace: "normal" }}
        >
          <Divider
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            About subtitle
          </Divider>
          <Typography
            component="p"
            dangerouslySetInnerHTML={{ __html: subtitle?.description }}
            variant="body1"
            width="100%"
            overflow="hidden"
            whiteSpace="pre-wrap"
          >
            {subtitle?.description}
          </Typography>
        </Box>
      </Container>
    </>
  );
};
export default SingleSubtitle;
