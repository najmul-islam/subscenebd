import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useGetMovieBySearchQuery } from "../../../features/movie/movieApi";
import { CalendarMonth, StarBorderRounded } from "@mui/icons-material";
import {
  Button,
  Grid,
  Typography,
  Box,
  CardMedia,
  Card,
  Stack,
  OutlinedInput,
} from "@mui/material";

// movie_poster url
const img_url = process.env.REACT_APP_IMG_API;

const ShortFilmSearch = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    search === "" ? "" : searchParams.get("title")
  );
  const [searchValue, setSearchValue] = useState(
    search === "" ? "" : searchParams.get("title")
  );

  const {
    data: shortFilms,
    isLoading,
    isError,
    error,
  } = useGetMovieBySearchQuery(searchValue);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchQuery);
    setSearchParams({ title: searchQuery });
  };

  console.log(shortFilms);
  if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      <Box>
        <Box marginLeft={{ lg: "-140px" }}>
          <Typography
            variant="h4"
            paddingY={2}
            fontWeight={600}
            textAlign="center"
          >
            Search Short-films
          </Typography>

          <form onSubmit={handleSearch}>
            <Stack
              padding={2}
              direction="row"
              spacing={1}
              maxWidth="650px"
              margin="0 auto"
            >
              <OutlinedInput
                id="search"
                name="search"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                fullWidth
                sx={{ height: "45px" }}
                placeholder="Search Movie"
              />
              <Button
                variant="contained"
                type="submit"
                // onClick={handleSearch}
                sx={{ paddingX: "30px" }}
              >
                Search
              </Button>
            </Stack>
          </form>
        </Box>

        <Box padding={2}>
          <Grid container spacing={2}>
            {shortFilms?.results?.map((film) => (
              <Grid item key={film.id}>
                <Box
                  sx={{ textDecoration: "none" }}
                  component={Link}
                  to={`/upload/short-film/${film.id}`}
                >
                  <Card
                    sx={{
                      width: { xs: "138px", sm: "150px" },
                      transition: "transform 0.3s",
                      zIndex: "1",
                      position: "relative",
                      // "&:hover": { transform: "scale(1.1)" },
                    }}
                  >
                    {film?.poster_path === null ? (
                      <CardMedia
                        component="img"
                        // image={`${img_url}${movie?.poster_path}`}
                        sx={{ height: { xs: "207", sm: "225px" } }}
                        // alt={movie?.title}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        image={`${img_url}${film?.poster_path}`}
                        sx={{ height: { xs: "207", sm: "225px" } }}
                        alt={film?.title}
                      />
                    )}
                    <Typography
                      variant="subtitle2"
                      paddingX="3px"
                      noWrap
                      title={film?.title}
                    >
                      {film?.title}
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
                        {film?.release_date === ""
                          ? "Unknown"
                          : new Date(film?.release_date).getFullYear()}
                      </Box>

                      <Box display="flex" alignItems="center">
                        <StarBorderRounded
                          sx={{ fontSize: "13px", marginRight: "3px" }}
                        />
                        {film?.vote_average === ""
                          ? "Unknown"
                          : film?.vote_average.toFixed(1)}
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {isError && (
          <Typography
            marginLeft={{ lg: "-140px" }}
            textAlign="center"
            variant="h6"
          >
            {error.status === "FETCH_ERROR"
              ? "Please cheack the internet connection"
              : ""}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ShortFilmSearch;
