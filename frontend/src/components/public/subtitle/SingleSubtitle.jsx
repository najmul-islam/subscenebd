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
  Stack,
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
    <>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                image={`${img_url}/${subtitle.poster_path}`}
              />
            </Card>
            <Card sx={{ width: "100%" }}>
              <CardActions>
                <Typography>{subtitle?.title}</Typography>
              </CardActions>
            </Card>
          </Stack>
        </Grid>
        <Grid item md={4} xs={12}>
          box
        </Grid>
      </Grid>
    </>
  );
};
export default SingleSubtitle;
