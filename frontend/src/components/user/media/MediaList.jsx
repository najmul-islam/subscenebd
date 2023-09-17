import { Box, Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const MediaList = ({ medias }) => {
  return (
    <Box>
      <Grid container>
        {medias.map((media) => (
          <MediaItem media={media} />
        ))}
      </Grid>
    </Box>
  );
};
export default MediaList;
