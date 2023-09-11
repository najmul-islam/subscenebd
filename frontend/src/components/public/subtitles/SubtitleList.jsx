import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import SubtitleItem from "./SubtitleItem";
import SubtitleItemSkeleton from "./SubtitleItemSkeleton";

import InfiniteScroll from "react-infinite-scroll-component";

const SubtitleList = ({
  data,
  isLoading,
  isError,
  error,
  fetchMore,
  hasMore,
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState(null);
  // const [subtitles, setSubtitles] = useState([]);

  // get subtitle
  // useEffect(() => {
  //   dispatch(
  //     subtitleApi.endpoints.getSubtitles.initiate({
  //       type: getSubtitles.type,
  //       media_type: getSubtitles.media_type,
  //       page: getSubtitles.page,
  //       limit: getSubtitles.limit,
  //       search: "",
  //     })
  //   )
  //     .unwrap()
  //     .then((data) => {
  //       setSubtitles(data.subtitles);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //       setIsError(true);
  //       setError(error);
  //     });
  // }, [dispatch, getSubtitles]);

  // console.log(data);

  const subtitles = data?.subtitles;

  let content;
  if (isLoading)
    content = (
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ height: "89vh", overflowY: "hidden" }}
        >
          {[...Array(36)].map((subtitle, i) => (
            <Grid item key={i}>
              <SubtitleItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  if (!isLoading && isError)
    content = (
      <Box>
        <Typography>{error}</Typography>
      </Box>
    );

  if (!isLoading && !isError && subtitles?.length === 0) {
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>No Subtitle Found</Typography>
    </Box>;
  }

  if (!isLoading && !isError && subtitles?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={subtitles.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50px",
            }}
          >
            <CircularProgress
              disableShrink
              size={30}
              sx={{ margin: "0 auto" }}
            />
          </Box>
        }
        endMessage={
          <Typography sx={{ textAlign: "center", padding: "5px" }}>
            <b>Yay! You have seen it all</b>
          </Typography>
        }
      >
        <Grid container spacing={2}>
          {subtitles?.map((subtitle) => (
            <SubtitleItem key={subtitle._id} subtitle={subtitle} />
          ))}
        </Grid>
      </InfiniteScroll>
    );
  }

  return <Box>{content}</Box>;
};

export default SubtitleList;
