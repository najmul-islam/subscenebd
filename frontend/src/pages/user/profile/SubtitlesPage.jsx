import { Box, Typography } from "@mui/material";
import SubtitleList from "../../../components/user/subtitles/SubtitleList";

const SubtitlesPage = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        paddingY={3}
        marginBottom={2}
        sx={{ width: { lg: "calc(100% - 280px)", xs: "100%" } }}
      >
        My Subtitle List
      </Typography>
      <SubtitleList />
    </Box>
  );
};

export default SubtitlesPage;
