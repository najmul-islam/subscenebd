import { Box, Grid, Typography } from "@mui/material";
import { TbDatabaseX } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "../../../features/user/usersApi";
import SubtitleItemSkeleton from "./SubtitleItemSkeleton";
import SubtitleItem from "./SubttitleItem";

const SubtitleList = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: userSubtitles,
    isLoading,
    isError,
    error,
  } = useGetUserQuery(user._id);
  // const isLoading = true;
  let content;
  if (isLoading)
    content = (
      <Box paddingY={2}>
        <Grid container spacing={2} justifyContent="center">
          {[...Array(30)].map((subtitle, i) => (
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

  if (!isLoading && !isError && userSubtitles?.subtitles?.length === 0) {
    content = (
      <Box
        sx={{
          width: {
            xs: "100%",
            lg: "calc(100% - 280px)",
          },
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TbDatabaseX style={{ fontSize: "100px" }} />
      </Box>
    );
  }

  if (!isLoading && !isError && userSubtitles?.subtitles?.length > 0) {
    content =
      userSubtitles?.subtitles.length > 0 ? (
        userSubtitles?.subtitles.map((subtitle) => (
          <SubtitleItem key={subtitle._id} subtitle={subtitle} />
        ))
      ) : (
        <Box>
          <Grid item>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              No Subtitle Found
            </Typography>
          </Grid>
        </Box>
      );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </Box>
  );
};
export default SubtitleList;
