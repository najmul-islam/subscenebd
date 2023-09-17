import { useDispatch, useSelector } from "react-redux";
import { Menu } from "@mui/icons-material";
import { Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { toggleSidebar } from "../../../../features/theme/themeSlice";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  const { sidebar, drawerWidth } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const handleSidebar = (value) => {
    dispatch(toggleSidebar(value));
  };
  return (
    <>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
        aria-label="mailbox folders"
      >
        {/* mobile view */}
        <Drawer
          variant="temporary"
          open={sidebar}
          onClose={() => handleSidebar(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: (theme) => theme.palette.background.default,
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
              onClick={() => handleSidebar(false)}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sm={{ flexGrow: 1 }}>
              Subscenebd
            </Typography>
          </Toolbar>
          <SidebarList />
          {/* <AccordionList /> */}
        </Drawer>

        {/* desktop view */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              background: (theme) => theme.palette.background.default,
              borderTop: "1px solid red",
            },
          }}
        >
          <Toolbar disableGutters sx={{ paddingX: "20px" }}>
            <Typography variant="h6" component="div">
              Subscenebd
            </Typography>
          </Toolbar>
          {/* <AccordionList /> */}
          <SidebarList />
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
