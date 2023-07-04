import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../features/theme/themeSlice";
import { IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

const Logo = () => {
  const { sidebar } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSidebar = (value) => {
    dispatch(toggleSidebar(value));
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => handleSidebar(!sidebar)}
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
        Logo
      </Typography>
    </>
  );
};

export default Logo;
