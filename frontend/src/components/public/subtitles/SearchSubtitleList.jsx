import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { subtitleApi } from "../../../features/subtitle/subtitleApi";
import { Box, Stack, Typography } from "@mui/material";
import SearchSubtitleItem from "./SearchSubtitleItem";
import SearchSubtitleSkeleton from "./SearchSubtitleSkeleton";

const SearchSubtitleList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [subtitles, setSubtitles] = useState([]);

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const title = searchParams.get("title").toString();
  useEffect(() => {
    dispatch(subtitleApi.endpoints.getSearchSubtitle.initiate(title))
      .unwrap()
      .then((data) => {
        setSubtitles(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setIsError(true);
        setError(error);
      });
  }, [dispatch, title]);

  let content;
  if (isLoading)
    content = (
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{
          width: { xs: "100%", lg: "calc(100% - 280px)" },
        }}
      >
        {[...Array(20)].map((subtitle, i) => (
          <SearchSubtitleSkeleton key={i} />
        ))}
      </Stack>
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
    content = subtitles?.map((subtitle) => (
      <SearchSubtitleItem key={subtitle._id} subtitle={subtitle} />
    ));
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={2}
      sx={{
        width: { xs: "100%", lg: "calc(100% - 280px)" },
      }}
    >
      {content}
    </Stack>
  );
};

export default SearchSubtitleList;
