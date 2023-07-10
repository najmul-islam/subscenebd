import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// component
import Header from "../components/shared/header/Header";
import Sidebar from "../components/shared/sidebar/Sidebar";
import GoToTop from "../components/shared/others/GoToTop";
import Footer from "../components/shared/footer/Footer";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const UsersLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const { drawerWidth } = useSelector((state) => state.theme);

  return !roles.length || roles.includes(user?.role) ? (
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
        <Toolbar sx={{ height: "65px" }} />
        <Box sx={{ minHeight: "80vh" }}>
          <Outlet />
        </Box>
        <GoToTop />
        <Footer />
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UsersLayout;
