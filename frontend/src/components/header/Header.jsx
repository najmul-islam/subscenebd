import { useSelector } from "react-redux";
import Logo from "./Logo";
import Profile from "./Profile";
import Uploads from "./Uploads";
import Notifications from "./Notifications";
import SearchBox from "./SearchBox";
import SignIn from "./SignIn";
import ToggleColorButton from "./ToggleColorButton";

import { Box, AppBar, Toolbar } from "@mui/material";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

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

          {user ? (
            <Box>
              <Uploads />
              <Notifications />
              <Profile />
            </Box>
          ) : (
            <Box>
              <SignIn />
              <ToggleColorButton />
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
