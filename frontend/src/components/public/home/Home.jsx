import { useEffect, useState } from "react";
import { useGetSubtitlesQuery } from "../../../features/subtitle/subtitleApi";
import HomeSubtitleList from "./HomeSubtitleList";

import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import {
  MovieOutlined,
  SlideshowOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import HomeSubtitleSkeleton from "./HomeSubtitleSkeleton";

const Home = () => {
  const useSubtitles = (type, media_type, limit) => {
    return useGetSubtitlesQuery({
      type,
      media_type,
      limit,
    });
  };

  const {
    data: latestAll,
    isLoading: latestAllIsLoading,
    isError: latestAllIsError,
    error: latestAllerror,
  } = useSubtitles("latest", "all", 9);

  const {
    data: latestMovies,
    isLoading: latestMoviesIsLoading,
    isError: latestMoviesIsError,
    error: latestMoviesError,
  } = useSubtitles("latest", "movie", 9);
  const {
    data: latestTv,
    isLoading: latestTvIsLoading,
    isError: latestTvIsError,
    error: latestTvError,
  } = useSubtitles("latest", "series", 9);
  const {
    data: popularAll,
    isLoading: popularAllIsLoading,
    isError: popularAllIsError,
    error: popularAllError,
  } = useSubtitles("popular", "all", 9);
  const {
    data: popularMovies,
    isLoading: popularMoviesIsLoading,
    isError: popularMoviesIsError,
    error: popularMoviesError,
  } = useSubtitles("popular", "movie", 9);
  const {
    data: popularTv,
    isLoading: popularTvIsLoading,
    isError: popularTvIsError,
    error: popularTvError,
  } = useSubtitles("popular", "series", 9);

  // Determine the overall loading state
  const isAnyLoading =
    latestAllIsLoading ||
    latestMoviesIsLoading ||
    latestTvIsLoading ||
    popularAllIsLoading ||
    popularMoviesIsLoading ||
    popularTvIsLoading;

  const [isLoading, setIsLoading] = useState(isAnyLoading);

  useEffect(() => {
    setIsLoading(isAnyLoading);
  }, [isAnyLoading]);

  return (
    <Box>
      {latestAllIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <HomeSubtitleList
          title="Latest subtitles"
          icon={VideoLibraryOutlined}
          subtitles={latestAll?.subtitles}
          link="/latest/all"
        />
      )}

      {latestMoviesIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <HomeSubtitleList
          title="Latest Movies"
          icon={MovieOutlined}
          subtitles={latestMovies?.subtitles}
          link="/latest/movies"
        />
      )}

      {latestTvIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <HomeSubtitleList
          title="Latest Tv-sereis"
          icon={SlideshowOutlined}
          subtitles={latestTv?.subtitles}
          link="/latest/series"
        />
      )}

      {popularAllIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <HomeSubtitleList
          title="Popular subtitles"
          icon={VideoLibraryOutlined}
          subtitles={popularAll?.subtitles}
          link="/popular/all"
        />
      )}

      {popularMoviesIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <HomeSubtitleList
          title="Popular Movies"
          icon={MovieOutlined}
          subtitles={popularMovies?.subtitles}
          link="/popular/movies"
        />
      )}

      {popularTvIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <HomeSubtitleList
          title="Popular Tv-sereis"
          icon={SlideshowOutlined}
          subtitles={popularTv?.subtitles}
          link="/popular/series"
        />
      )}
    </Box>
  );
};

export default Home;
