import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useGetSeriesBySearchQuery } from "../../../features/series/seriesApi";
import { CalendarMonth, StarBorderRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Grid,
  Typography,
  CardMedia,
  Card,
  OutlinedInput,
} from "@mui/material";
import SeriesSearchSkeleton from "./SeriesSearchSkeleton";

// movie_poster url
const img_url = process.env.REACT_APP_IMG_API;

const SeriesSearch = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    search === "" ? "" : searchParams.get("title")
  );
  const [searchValue, setSearchValue] = useState(
    search === "" ? "" : searchParams.get("title")
  );

  const {
    data: series,
    isLoading,
    isError,
    error,
  } = useGetSeriesBySearchQuery(searchValue);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(searchQuery);
    setSearchParams({ title: searchQuery });
  };

  return (
    <Box>
      <Box
        sx={{
          width: { xs: "100%", lg: "calc(100% - 280px)" },
          textTransform: "none",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h4"
          paddingY={2}
          fontWeight={600}
          textAlign="center"
        >
          Search Series
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
              sx={{ height: "40px", borderRadius: "50px 0 0 50px" }}
              placeholder="Search Seires"
            />
            <Button
              variant="contained"
              type="submit"
              // onClick={handleSearch}
              sx={{
                // paddingX: "30px",
                textTransform: "none",
                borderRadius: "0 50px 50px 0",
                boxShadow: "0",
              }}
            >
              Search
            </Button>
          </Stack>
        </form>
      </Box>

      <Box>
        {isLoading ? (
          <Grid container spacing={2} justifyContent="center">
            {[...Array(30)].map((subtitle, i) => (
              <Grid item key={i}>
                <SeriesSearchSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid
            container
            spacing={2}
            justifyContent={{ xs: "center", sm: "start" }}
          >
            {series?.results?.map((singleSeries) => (
              <Grid item key={singleSeries.id}>
                <Box
                  sx={{ textDecoration: "none" }}
                  component={Link}
                  to={`/upload/series/${singleSeries.id}`}
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
                    {singleSeries?.poster_path === null ? (
                      <CardMedia
                        component="img"
                        // image={`${img_url}${movie?.poster_path}`}
                        sx={{ height: { xs: "207", sm: "225px" } }}
                        // alt={movie?.title}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        image={`${img_url}${singleSeries?.poster_path}`}
                        sx={{ height: { xs: "207", sm: "225px" } }}
                        alt={singleSeries?.title}
                      />
                    )}
                    <Typography
                      variant="subtitle2"
                      paddingX="3px"
                      noWrap
                      title={singleSeries?.name}
                    >
                      {singleSeries?.name}
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
                        {singleSeries?.first_air_date === ""
                          ? "Unknown"
                          : new Date(
                              singleSeries?.first_air_date
                            ).getFullYear()}
                      </Box>

                      <Box display="flex" alignItems="center">
                        <StarBorderRounded
                          sx={{ fontSize: "13px", marginRight: "3px" }}
                        />
                        {singleSeries?.vote_average === ""
                          ? "Unknown"
                          : singleSeries?.vote_average.toFixed(1)}
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
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
  );
};

export default SeriesSearch;
