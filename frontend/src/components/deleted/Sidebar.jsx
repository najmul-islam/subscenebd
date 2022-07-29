import { useHeader } from "../../contexts/HeaderContext";
import { Box, Drawer, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SidebarList from "./SidebarList";

const Sidebar = () => {
  const { toggleSidebar, setToggleSidebar } = useHeader();

  return (
    <div>
      <Drawer open={toggleSidebar} onClose={() => setToggleSidebar(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setToggleSidebar(false)}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
          </Toolbar>

          <SidebarList />
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;
