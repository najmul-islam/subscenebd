import { Box, Card, CardMedia, Typography } from "@mui/material";
const img_url = process.env.REACT_APP_IMG_API;

const SingleMedia = ({ media }) => {
  console.log("media", media);
  return (
    <Box>
      <Card
        sx={{
          width: "180px",
        }}
      >
        <CardMedia
          component="img"
          image={`${img_url}${media?.poster_path}`}
          //   sx={{ width: "170px" }}
          alt={media?.name}
        />

        <Typography variant="h6" paddingX="3px" noWrap title={media?.title}>
          {media?.name}
        </Typography>

        <Typography variant="subtitle2" paddingX="3px" noWrap>
          {new Date(media?.air_date).getFullYear()}
        </Typography>
      </Card>
    </Box>
  );
};
export default SingleMedia;
