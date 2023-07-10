import React from "react";
import { Box, Grid } from "@mui/material";
import SubtitleItem from "./SubtitleItem";
import SubtitleItemSkeleton from "./SubtitleItemSkeleton";
import { useGetSubtitlesQuery } from "../../../features/subtitle/subtitleApi";

const SubtitleList = () => {
  const { data: subtitles, isLoading, isError, error } = useGetSubtitlesQuery();

  // console.log("Subtitle", subtitles);

  if (isLoading)
    return (
      <Box>
        <Grid container spacing={2}>
          {[...Array(30)].map((subtitle, i) => (
            <SubtitleItemSkeleton key={i} />
          ))}
        </Grid>
      </Box>
    );

  return (
    <Box>
      <Grid container spacing={2}>
        {subtitles.map((subtitle) => (
          <SubtitleItem key={subtitle._id} subtitle={subtitle} />
        ))}
      </Grid>
    </Box>
  );
};

export default SubtitleList;
