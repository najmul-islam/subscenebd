import { useParams } from "react-router-dom";
import { useGetSubtitleQuery } from "../../../features/subtitle/subtitleApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const img_url = process.env.REACT_APP_IMG_API;

const SingleSubtitle = () => {
  const { subtitleId } = useParams();
  console.log(subtitleId);
  const {
    data: subtitle,
    isLoading,
    isError,
    error,
  } = useGetSubtitleQuery(subtitleId);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Box>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={`${img_url}/${subtitle.poster_path}`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          box
        </Grid>
      </Grid>
    </Box>
  );
};
export default SingleSubtitle;
