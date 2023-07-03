import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  seriesApi,
  useGetSeriesByIdQuery,
} from "../../../features/series/seriesApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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
    <div>
      {series?.seasons.map((season) => (
        <Card sx={{ maxWidth: 345 }} key={season.id}>
          <CardMedia
            sx={{ height: 140 }}
            image={`${img_url}/${season.poster_path}`}
            title="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component={Link}
              to={`season/${season.season_number}`}
            >
              {season.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {season.air_date}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SeriesDetails;
