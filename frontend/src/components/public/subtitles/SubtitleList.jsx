import { Box, CircularProgress, Grid, Typography } from "@mui/material";
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
  const subtitles = data?.subtitles;

  let content;
  if (isLoading)
    content = (
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ height: "89vh", overflowY: "hidden" }}
          justifyContent="center"
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
    content = (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">No Subtitle Found</Typography>
      </Box>
    );
  }

  if (!isLoading && !isError && subtitles?.length > 0) {
    content = (
      <InfiniteScroll
        dataLength={subtitles.length}
        next={fetchMore}
        hasMore={hasMore}
        // loader={[...Array(36)].map((subtitle, i) => (
        //   <Grid item key={i}>
        //     <SubtitleItemSkeleton />
        //   </Grid>
        // ))}
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
        // endMessage={
        //   <Typography sx={{ textAlign: "center", padding: "5px" }}>
        //     <b>Yay! You have seen it all</b>
        //   </Typography>
        // }
      >
        <Grid container spacing={2} justifyContent="center">
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
