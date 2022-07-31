import useHeader from "../../hooks/HeaderHook";
import { IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Logo = () => {
  const { toggleSidebar, setToggleSidebar } = useHeader();
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setToggleSidebar(!toggleSidebar)}
        sx={{ mr: 2, p: "10px", display: { xs: "inline-flex", md: "none" } }}
      >
        <Menu />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, p: "10px", display: { md: "inline-flex", xs: "none" } }}
      >
        <Menu />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Drawer
      </Typography>
    </>
  );
};

export default Logo;
