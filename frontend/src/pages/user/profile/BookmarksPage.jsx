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
        sx={{ width: { lg: "calc(100% - 280px)", xs: "100%" } }}
      >
        My Bookmarks List
      </Typography>
      <BookmarkList />
    </Box>
  );
};

export default BookmarksPage;
