import { useNavigate, useParams } from "react-router-dom";
import { useGetSubtitleQuery } from "../../../features/subtitle/subtitleApi";
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Container,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
import Comments from "./CommentList";
import AboutSubtitle from "./AboutSubtitle";
import ReleaseInfo from "./ReleaseInfo";
import UserInfo from "./UserInfo";
import ActionButtons from "./ActionButtons";
import UserInfoSkeleton from "./UserInfoSkeleton";
import ActionButtonsSkeleton from "./ActionButtonsSkeleton";

const img_url = process.env.REACT_APP_IMG_API;
const avatar_url = process.env.REACT_APP_AVATAR_URL;

const SingleSubtitle = () => {
  const { drawerWidth } = useSelector((state) => state.theme);

  const { subtitleId } = useParams();
  const navigate = useNavigate();

  const { data: subtitle, isLoading } = useGetSubtitleQuery(subtitleId);

  const handleGenres = (genre) => {
    navigate(`/subtitles/genres/${genre}`);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            xs: "100%",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          marginBottom={2}
        >
          {/* movie poster */}

          {isLoading ? (
            <Skeleton
              variant="rectangular"
              width={200}
              height={300}
              sx={{ borderRadius: "5px" }}
            />
          ) : (
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
          )}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {/* title */}
            <Box>
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={300}
                  sx={{ fontSize: "20px" }}
                />
              ) : (
                <Typography variant="h6">
                  {subtitle?.title} ({subtitle?.release_date})
                </Typography>
              )}
              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={150}
                  sx={{ fontSize: "12px" }}
                />
              ) : (
                <Typography variant="caption">
                  Uploaded {moment(subtitle.createdAt).format("MMM D, YYYY")}
                </Typography>
              )}
              {/* genres */}
              <Stack direction="row" spacing={1} marginY={1} marginTop={2}>
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rounded"
                      width={50}
                      height={20}
                      sx={{ borderRadius: "5px" }}
                    />
                    <Skeleton
                      variant="rounded"
                      width={50}
                      height={20}
                      sx={{ borderRadius: "5px" }}
                    />
                    <Skeleton
                      variant="rounded"
                      width={50}
                      height={20}
                      sx={{ borderRadius: "5px" }}
                    />
                  </>
                ) : (
                  <>
                    {subtitle?.genres?.map((genre, i) => (
                      <Chip
                        key={i}
                        variant="outlined"
                        label={genre}
                        size="small"
                        onClick={() => handleGenres(genre?.toLowerCase())}
                        sx={{ borderRadius: "5px" }}
                      />
                    ))}
                  </>
                )}
              </Stack>

              {/* user info */}
              {isLoading ? (
                <UserInfoSkeleton />
              ) : (
                <UserInfo subtitle={subtitle} />
              )}
            </Box>

            {/* download like dislike*/}

            {isLoading ? (
              <ActionButtonsSkeleton />
            ) : (
              <ActionButtons subtitle={subtitle} />
            )}
          </Box>
        </Stack>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        sx={{
          width: {
            lg: `calc(100% - ${drawerWidth}px)`,
            xs: "100%",
          },
        }}
      >
        <Container>
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ marginBottom: "20px", borderRadius: "5px" }}
            />
          ) : (
            <ReleaseInfo releaseName={subtitle?.release_name} />
          )}
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={200}
              sx={{ marginBottom: "20px", borderRadius: "5px" }}
            />
          ) : (
            <AboutSubtitle description={subtitle?.description} />
          )}
          {isLoading ? (
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ marginBottom: "20px", borderRadius: "5px" }}
            />
          ) : (
            <Comments subtitle={subtitle} />
          )}
        </Container>
      </Box>
    </>
  );
};
export default SingleSubtitle;
