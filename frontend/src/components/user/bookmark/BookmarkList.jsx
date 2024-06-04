import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { TbDatabaseX } from "react-icons/tb";
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

  if (subtitles.length === 0) {
    return (
      <Box
        sx={{
          width: {
            xs: "100%",
            lg: "calc(100% - 280px)",
          },
          height: "75vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TbDatabaseX style={{ fontSize: "100px" }} />
      </Box>
    );
  }

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
