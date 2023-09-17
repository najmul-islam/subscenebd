import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BookmarkItem from "./BookmarkItem";

const BookmarkList = () => {
  const [bookmarkSubtitles, setBookmarkSubtitles] = useState([]);

  const { subtitles } = useSelector((state) => state.subtitles);

  useEffect(() => {
    if (subtitles) {
      setBookmarkSubtitles(subtitles);
    }
  }, [subtitles]);

  return (
    <Box padding={2}>
      <Grid container spacing={2}>
        {bookmarkSubtitles?.map((subtitle) => (
          <BookmarkItem key={subtitle._id} subtitle={subtitle} />
        ))}
      </Grid>
    </Box>
  );
};
export default BookmarkList;
