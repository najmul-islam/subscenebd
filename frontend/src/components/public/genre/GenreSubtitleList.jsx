import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const GenreSubtitleList = () => {
  const { genreName } = useParams();
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box>
        <h1>This page is currently under construction</h1>
        <h2>Thank you for your patience. It will be coming soon.</h2>
      </Box>
    </Box>
  );
};
export default GenreSubtitleList;
