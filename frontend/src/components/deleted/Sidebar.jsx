import { useHeader } from "../../contexts/HeaderContext";
import { Box, Drawer, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SidebarList from "./SidebarList";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../features/theme/themeSlice";

const Sidebar = () => {
  // const { toggleSidebar, setToggleSidebar } = useHeader();
  const { sidebar } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const handleSidebar = (value) => {
    dispatch(toggleSidebar(value));
  };
  return (
    <div>
      <Drawer open={sidebar} onClose={() => handleSidebar(false)}>
        <Box sx={{ width: 240 }} role="presentation">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => handleSidebar(false)}
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
