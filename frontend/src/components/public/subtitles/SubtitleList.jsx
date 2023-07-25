import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { subtitleApi } from "../../../features/subtitle/subtitleApi";
import { Box, Grid, Typography } from "@mui/material";
import SubtitleItem from "./SubtitleItem";
import SubtitleItemSkeleton from "./SubtitleItemSkeleton";

const SubtitleList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [subtitles, setSubtitles] = useState([]);

  const { searchSubtitle } = useSelector((state) => state.subtitles);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // get last 30 days popular subtitle
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const thirtyDaysSubtitles = subtitles?.filter(
    (subtitle) => new Date(subtitle.createdAt) >= thirtyDaysAgo
  );

  const popularSubtitles = thirtyDaysSubtitles.sort(
    (a, b) => b.downloads - a.downloads
  );

  // filter subtitle by url
  const filterSubtitles = (subtitle) => {
    switch (pathname) {
      case "/latest/all":
        return subtitle;
      case "/latest/movies":
        return subtitle.media_type === "movie";
      case "/latest/series":
        return subtitle.media_type === "series";
      case "/latest/short-films":
        return subtitle.media_type === "short-film";
      case "/latest/musics":
        return subtitle.music === "music";
      case "/popular/all":
        return subtitle;
      case "/popular/movies":
        return subtitle.media_type === "movie";
      case "/popular/series":
        return subtitle.media_type === "series";
      case "/popular/short-films":
        return subtitle.media_type === "short-film";
      case "/popular/musics":
        return subtitle.media_type === "music";
      default:
        return true;
    }
  };

  // filterd subtitle
  const filterdSubtitle =
    pathname === "/latest/all"
      ? subtitles?.filter(filterSubtitles)
      : popularSubtitles?.filter(filterSubtitles);

  // searchd subtitle
  const searchedSubtitle = subtitles.filter((subtitle) =>
    subtitle?.title.toLowerCase().includes(searchSubtitle)
  );

  // get subtitle
  useEffect(() => {
    dispatch(subtitleApi.endpoints.getSubtitles.initiate())
      .unwrap()
      .then((data) => {
        setSubtitles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        setError(error);
      });
  }, [dispatch]);

  // console.log(subtitles);
  // console.log(error);

  let content;
  if (isLoading)
    content = (
      <Box paddingY={2}>
        <Grid container spacing={2} justifyContent="center">
          {[...Array(30)].map((subtitle, i) => (
            <Grid item key={i}>
              <SubtitleItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  if (!isLoading && isError)
    content = (
      <Box>
        <Typography>{error}</Typography>
      </Box>
    );

  if (!isLoading && !isError && subtitles?.length === 0) {
    <Box>
      <Typography>No Subtitle Found</Typography>
    </Box>;
  }

  if (!isLoading && !isError && subtitles?.length > 0) {
    content =
      filterdSubtitle?.length > 0 ? (
        searchSubtitle === "" ? (
          filterdSubtitle?.map((subtitle) => (
            <SubtitleItem key={subtitle._id} subtitle={subtitle} />
          ))
        ) : (
          searchedSubtitle.map((subtitle) => (
            <SubtitleItem key={subtitle._id} subtitle={subtitle} />
          ))
        )
      ) : (
        <Box>
          <Grid item>
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              No Subtitle Found
            </Typography>
          </Grid>
        </Box>
      );
  }

  return (
    <Box>
      <Grid container spacing={2}>
        {content}
      </Grid>
    </Box>
  );
};

export default SubtitleList;
