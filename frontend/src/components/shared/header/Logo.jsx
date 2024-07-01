import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoDark from "../../../assets/image/subsceneb-dark-logo.png";
import logo from "../../../assets/image/subscenebd-logo.png";
import { toggleSidebar } from "../../../features/theme/themeSlice";

const Logo = () => {
  const { sidebar, mode } = useSelector((state) => state.theme);
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
        sx={{
          mr: 0,
          p: "10px",
          display: { xs: "inline-flex", lg: "none" },
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Menu />
      </IconButton>
      <IconButton
        aria-label="open drawer"
        edge="start"
        sx={{
          mr: 0,
          p: "10px",
          display: { lg: "inline-flex", xs: "none" },
          color: (theme) => theme.palette.text.primary,
        }}
      >
        <Menu />
      </IconButton>
      {mode === "light" ? (
        <Link to="/">
          <Box
            component="img"
            src={logo}
            alt="light-logo"
            sx={{
              width: { sm: "150px", xs: "100px" },
              display: "flex",
              alignItems: "center",
            }}
          />
        </Link>
      ) : (
        <Link to="/">
          <Box
            component="img"
            src={logoDark}
            alt="dark-logo"
            sx={{
              width: { sm: "150px", xs: "100px" },
              display: "flex",
            }}
          />
        </Link>
      )}
    </>
  );
};

export default Logo;
