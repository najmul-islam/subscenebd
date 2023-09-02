import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../../features/theme/themeSlice";
import { IconButton, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Logo = () => {
  const { sidebar } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSidebar = (value) => {
    dispatch(toggleSidebar(value));
  };

  return (
    <>
      <IconButton
        aria-label="open drawer"
        edge="start"
        onClick={() => handleSidebar(!sidebar)}
        sx={{ mr: 2, p: "10px", display: { xs: "inline-flex", lg: "none" } }}
      >
        <Menu />
      </IconButton>
      <IconButton
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, p: "10px", display: { lg: "inline-flex", xs: "none" } }}
      >
        <Menu />
      </IconButton>
      <Typography
        component={Link}
        to={`/`}
        sx={{
          color: (theme) => theme.palette.text.primary,
          textDecoration: "none",
        }}
        variant="h6"
        noWrap
      >
        Subscenebd
      </Typography>
    </>
  );
};

export default Logo;
