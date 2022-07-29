import React from "react";
import useHeader from "../hooks/HeaderHook";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import GoToTop from "../components/others/GoToTop";
import Footer from "../components/footer/Footer";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const PublicLayoute = (props) => {
  const { drawerWidth } = useHeader();
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <CssBaseline />
        <Toolbar sx={{ minHeight: "64px" }} />
        <Outlet />
        <GoToTop />
        <Footer />
      </Box>
    </Box>
  );
};

export default PublicLayoute;
