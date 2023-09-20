import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// component
import Header from "../components/shared/header/Header";
import Sidebar from "../components/user/message/sidebar/Sidebar";
import { Box, CssBaseline, Toolbar } from "@mui/material";

const UsersLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);
  const { drawerWidth } = useSelector((state) => state.theme);

  return !roles.length || roles.includes(user?.role) ? (
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
        <Toolbar sx={{ height: "65px" }} />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UsersLayout;
