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
    <Box>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            marginBottom={2}
          >
            <Box boxShadow={3} borderRadius={1} margin="0 auto">
              <Card sx={{ maxWidth: "200px", boxShadow: "none" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={`${img_url}/${subtitle.poster_path}`}
                />
              </Card>
            </Box>
            <Box boxShadow={3} width="100%" padding={1} borderRadius={1}>
              <Typography variant="h6">{subtitle?.title}</Typography>
            </Box>
          </Stack>
          <Box boxShadow={3} padding={1} borderRadius={1}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            magnam pariatur doloribus eos! Quam magni facilis beatae excepturi
            harum itaque, sequi officiis sunt! Laboriosam rem autem ducimus
            facilis repellat? Voluptatem consequuntur adipisci, voluptatibus
            numquam hic excepturi sapiente iure cum eius delectus est. Qui
            laborum laboriosam et, praesentium numquam laudantium fugiat.
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          box
        </Grid>
      </Grid>
    </Box>
  );
};
export default SingleSubtitle;
