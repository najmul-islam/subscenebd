import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, CssBaseline, Toolbar } from "@mui/material";
// component
import Header from "../components/shared/header/Header";
import Sidebar from "../components/shared/sidebar/Sidebar";
import GoToTop from "../components/shared/others/GoToTop";

const PublicLayout = () => {
  const { drawerWidth } = useSelector((state) => state.theme);
  return (
    <Box display="flex">
      <Header />
      <Sidebar />
      <Box
        component="main"
        flexGrow={1}
        width={{ sm: `calc(100% - ${drawerWidth}px)` }}
      >
        <CssBaseline />
        <Toolbar sx={{ height: "65px" }} />
        <Box padding={2}>
          <Outlet />
        </Box>
        <GoToTop />
      </Box>
    </Box>
  );
};

export default PublicLayout;
