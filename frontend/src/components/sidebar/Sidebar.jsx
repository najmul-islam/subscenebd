import { useHeader } from "../../contexts/HeaderContext";
import { Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SidebarList from "./SidebarList";
import Header from "../header/Header";

const Sidebar = () => {
  const { toggleSidebar, setToggleSidebar, drawerWidth } = useHeader();
  return (
    <>
      <Header />
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* mobile view */}
        <Drawer
          variant="temporary"
          open={toggleSidebar}
          onClose={() => setToggleSidebar(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar sx={{ paddingX: "16px", height: "65px" }} disableGutters>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ marginRight: 2 }}
              onClick={() => setToggleSidebar(false)}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sm={{ flexGrow: 1 }}>
              News
            </Typography>
          </Toolbar>
          <SidebarList />
        </Drawer>

        {/* desktop view */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar disableGutters sx={{ paddingX: "20px" }}>
            <Typography variant="h6" component="div">
              News
            </Typography>
          </Toolbar>
          <SidebarList />
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
