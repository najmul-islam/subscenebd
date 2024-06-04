import { Box, Divider, Typography } from "@mui/material";
import DownloadList from "../../../components/user/download/DownloadList";

const DownloadsPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center align items horizontally
          width: { lg: "calc(100% - 280px)", xs: "100%" },
          paddingBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            width: "100%",
            paddingBottom: 2,
          }}
        >
          Downloads List
        </Typography>
        <Divider sx={{ width: "150px", margin: "0 auto", marginBottom: 2 }} />
      </Box>

      <DownloadList />
    </Box>
  );
};

export default DownloadsPage;
