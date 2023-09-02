import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { seriesApi } from "../../../features/series/seriesApi";
import { useDispatch } from "react-redux";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { CalendarMonth, StarBorderRounded } from "@mui/icons-material";

// movie_poster url
const img_url = process.env.REACT_APP_IMG_API;

const SeriesDetails = () => {
  const [series, setSeries] = useState();

  const { seriesId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(seriesApi.endpoints.getSeriesById.initiate(seriesId))
      .unwrap()
      .then((data) => setSeries(data));
  }, [dispatch, seriesId]);

  console.log("series: ", series);

  return (
    <Box>
      <Typography
        variant="h5"
        padding={2}
        fontWeight="700"
        textAlign="center"
        marginBottom={3}
        sx={{
          width: { xs: "100%", lg: "calc(100% - 280px)" },
          marginBottom: "30px",
        }}
      >
        Select a season
      </Typography>

      <Box>
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", sm: "start" }}
        >
          {series?.seasons.map((season) => (
            <Grid item key={season.id}>
              <Box
                sx={{ textDecoration: "none" }}
                component={Link}
                to={`season/${season.season_number}`}
              >
                <Card
                  sx={{
                    width: { xs: "138px", sm: "150px" },
                    transition: "transform 0.3s",
                    zIndex: "1",
                    position: "relative",
                  }}
                >
                  {season?.poster_path === null ? (
                    <CardMedia
                      component="img"
                      // image={`${img_url}${movie?.poster_path}`}
                      sx={{ height: { xs: "207px", sm: "225px" } }}
                      // alt={movie?.title}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      image={`${img_url}${season?.poster_path}`}
                      sx={{ height: { xs: "207px", sm: "225px" } }}
                      alt={season?.title}
                    />
                  )}
                  <Typography
                    variant="subtitle2"
                    paddingX="3px"
                    noWrap
                    title={season?.title}
                  >
                    {season?.name}
                  </Typography>

                  <Box
                    sx={{
                      paddingX: "3px",
                      paddingBottom: "3px",
                      fontSize: "13px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <CalendarMonth
                        sx={{ fontSize: "13px", marginRight: "3px" }}
                      />
                      {season?.air_date === ""
                        ? "Unknown"
                        : new Date(season?.air_date).getFullYear()}
                    </Box>

                    <Box display="flex" alignItems="center">
                      <StarBorderRounded
                        sx={{ fontSize: "13px", marginRight: "3px" }}
                      />
                      {season?.vote_average === ""
                        ? "Unknown"
                        : season?.vote_average.toFixed(1)}
                    </Box>
                  </Box>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SeriesDetails;
