import React from "react";
import useMovie from "../../hooks/MovieHook";
import { Box, Button } from "@mui/material";
const UploadMovie = () => {
  const { movie, handleSubmit, handleSub } = useMovie();
  console.log(movie);
  return (
    movie && (
      <Box>
        <form action="" onClick={() => handleSubmit()}>
          <input type="file" onChange={handleSub} />

          <h1>Name: {movie.title}</h1>
          <h2>Year: {movie.release_date}</h2>
          <Button variant="outlined" type="submit">
            Upload
          </Button>
        </form>
      </Box>
    )
  );
};

export default UploadMovie;
