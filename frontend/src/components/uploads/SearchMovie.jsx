import React, { useState } from "react";
import useMovie from "../../hooks/MovieHook";
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
} from "@mui/material";
import { Link } from "react-router-dom";
const movie_poster = process.env.REACT_APP_IMG_API;

const SearchMovie = () => {
  const { search, setSearch, searchMovies, handleSearch, handleMovie, movie } =
    useMovie();

  console.log("searchMovies", searchMovies);
  return (
    <Box>
      <form onSubmit={handleSearch}>
        <TextField
          fullWidth
          label="search movie"
          id="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </form>

      <List>
        {searchMovies.map((movie) => (
          <ListItem key={movie.id} onClick={() => handleMovie(movie.id)}>
            <Link to="/upload/movie/upload">
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  sx={{ width: 70, height: 40 }}
                  src={`${movie_poster}${movie.poster_path}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={movie.title}
                secondary={movie.release_date.substr(0, 4)}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchMovie;
