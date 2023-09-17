import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const PopularLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default PopularLayout;
