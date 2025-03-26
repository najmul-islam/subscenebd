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
  const { data: latestAll, isLoading: latestAllIsLoading } =
    useGetSubtitlesQuery({ type: "latest", media_type: "all", limit: 9 });

  const { data: latestMovies, isLoading: latestMoviesIsLoading } =
    useGetSubtitlesQuery({ type: "latest", media_type: "movie", limit: 9 });

  const { data: latestTv, isLoading: latestTvIsLoading } = useGetSubtitlesQuery(
    { type: "latest", media_type: "series", limit: 9 }
  );

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
    </Box>
  );
};

export default Home;
