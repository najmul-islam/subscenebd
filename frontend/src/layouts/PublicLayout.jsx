import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, CssBaseline, Toolbar } from "@mui/material";
// component
import Header from "../components/shared/header/Header";
import Sidebar from "../components/shared/sidebar/Sidebar";
import GoToTop from "../components/shared/others/GoToTop";
import Footer from "../components/shared/footer/Footer";

const PublicLayout = () => {
  const { drawerWidth } = useSelector((state) => state.theme);
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
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

export default PublicLayout;
