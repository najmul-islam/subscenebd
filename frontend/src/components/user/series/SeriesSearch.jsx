import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetSeriesBySearchQuery } from "../../../features/series/seriesApi";

// movie_poster url
const img_api = process.env.REACT_APP_IMG_API;

const SeriesSearch = () => {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { data: series, isLoading } = useGetSeriesBySearchQuery(searchValue);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(search);
  };

  console.log(series);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <form onSubmit={handleSearch}>
            <TextField
              fullWidth
              label="search movie"
              id="search"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" type="submit">
            Search
          </Button>
        </Grid>
      </Grid>
      {isLoading ? <p>Loading...</p> : null}
      <Grid container spacing={2}>
        <List>
          {/* onClick={() => navigate(`/upload/movie/${}`)} */}
          {series ? (
            series?.results?.map((series) => (
              <ListItem key={series.id}>
                <Link to={`/upload/series/${series.id}`}>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      sx={{ width: 70, height: 40 }}
                      src={`${img_api}${series.poster_path}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={series.original_name}
                    secondary={series.first_air_date.substr(0, 4)}
                  />
                </Link>
              </ListItem>
            ))
          ) : (
            <h2>No movies found with this title</h2>
          )}
        </List>
      </Grid>
    </>
  );
};

export default SeriesSearch;
