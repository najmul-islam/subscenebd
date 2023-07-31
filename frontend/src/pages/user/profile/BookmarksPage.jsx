import { Box, Typography } from "@mui/material";
import BookmarkList from "../../../components/user/bookmark/BookmarkList";

const BookmarksPage = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        paddingY={3}
        marginBottom={2}
        sx={{ marginLeft: { lg: "-240px" } }}
      >
        My Bookmarks List
      </Typography>
      <BookmarkList />
    </Box>
  );
};

export default BookmarksPage;
