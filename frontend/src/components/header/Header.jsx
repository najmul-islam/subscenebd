import Logo from "./Logo";
import Profile from "./Profile";
import Uploads from "./Uploads";
import Notifications from "./Notifications";
import SearchBox from "./SearchBox";

import { Box, AppBar, Toolbar } from "@mui/material";

const Header = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: { md: 0 },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            height: "65px",
            paddingX: "18px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Logo />
          </Box>

          <SearchBox />

          <Box>
            <Uploads />
            <Notifications />
            <Profile />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
