import { Card, CardMedia, Grid, Typography } from "@mui/material";

const img_url = process.env.REACT_APP_IMG_API;

const MediaItem = ({ media }) => {
  console.log("media", media);
  return (
    <Grid item>
      <Card
        sx={{
          width: { xs: "138px", sm: "150px" },
          transition: "transform 0.3s",
          zIndex: "1",
          position: "relative",
          // "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <CardMedia
          component="img"
          image={`${img_url}${media?.poster_path}`}
          // sx={{ height: "200px" }}
          alt={media?.title}
        />
      </Card>

      <Typography
        variant="subtitle2"
        paddingX="3px"
        noWrap
        title={media?.title}
      >
        {media?.title}
      </Typography>

      <Typography variant="body2" paddingX="3px" noWrap>
        {new Date(media?.release_date).getFullYear()}
      </Typography>
    </Grid>
  );
};
export default MediaItem;
