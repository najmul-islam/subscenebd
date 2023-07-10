import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetMovieBySearchQuery } from "../../../features/movie/movieApi";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@mui/material";

// movie_poster url
const movie_poster = process.env.REACT_APP_IMG_API;

const ShortFilmSearch = () => {
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { data: shortFilms, isLoading } = useGetMovieBySearchQuery(searchValue);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(search);
  };

  console.log(shortFilms);
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
          {shortFilms ? (
            shortFilms?.results?.map((film) => (
              <ListItem key={film.id}>
                <Link to={`/upload/short-film/${film.id}`}>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      sx={{ width: 70, height: 40 }}
                      src={`${movie_poster}${film.poster_path}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={film.title}
                    secondary={film.release_date.substr(0, 4)}
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

export default ShortFilmSearch;
