import React from "react";
import { useHeader } from "../contexts/HeaderContext";
import { Outlet } from "react-router-dom";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const PublicLayoute = () => {
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
        <Footer />
      </Box>
    </Box>
  );
};

export default PublicLayoute;
