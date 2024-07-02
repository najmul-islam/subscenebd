import {
  MovieOutlined,
  SlideshowOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { useGetSubtitlesQuery } from "../../../features/subtitle/subtitleApi";
import HomeSubtitleList from "./HomeSubtitleList";
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

  return (
    <Box>
      {latestAllIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <Suspense fallback={<HomeSubtitleSkeleton />}>
          <HomeSubtitleList
            title="Latest subtitles"
            icon={VideoLibraryOutlined}
            subtitles={latestAll?.subtitles}
            link="/latest/all"
          />
        </Suspense>
      )}
      {latestMoviesIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <Suspense fallback={<HomeSubtitleSkeleton />}>
          <HomeSubtitleList
            title="Latest Movies"
            icon={MovieOutlined}
            subtitles={latestMovies?.subtitles}
            link="/latest/movies"
          />
        </Suspense>
      )}

      {latestTvIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <Suspense fallback={<HomeSubtitleSkeleton />}>
          <HomeSubtitleList
            title="Latest Tv-sereis"
            icon={SlideshowOutlined}
            subtitles={latestTv?.subtitles}
            link="/latest/series"
          />
        </Suspense>
      )}

      {popularAllIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <Suspense fallback={<HomeSubtitleSkeleton />}>
          <HomeSubtitleList
            title="Popular subtitles"
            icon={VideoLibraryOutlined}
            subtitles={popularAll?.subtitles}
            link="/popular/all"
          />
        </Suspense>
      )}
      {popularMoviesIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <Suspense fallback={<HomeSubtitleSkeleton />}>
          <HomeSubtitleList
            title="Popular Movies"
            icon={MovieOutlined}
            subtitles={popularMovies?.subtitles}
            link="/popular/movies"
          />
        </Suspense>
      )}
      {popularTvIsLoading ? (
        <HomeSubtitleSkeleton />
      ) : (
        <Suspense fallback={<HomeSubtitleSkeleton />}>
          <HomeSubtitleList
            title="Popular Tv-sereis"
            icon={SlideshowOutlined}
            subtitles={popularTv?.subtitles}
            link="/popular/series"
          />
        </Suspense>
      )}
    </Box>
  );
};

export default Home;
