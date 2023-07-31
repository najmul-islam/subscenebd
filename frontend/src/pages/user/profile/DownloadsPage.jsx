import { Box, Typography } from "@mui/material";
import DownloadList from "../../../components/user/download/DownloadList";

const DownloadsPage = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        paddingY={3}
        marginBottom={2}
        sx={{ marginLeft: { lg: "-270px" } }}
      >
        My Downloads List
      </Typography>
      <DownloadList />
    </Box>
  );
};

export default DownloadsPage;
