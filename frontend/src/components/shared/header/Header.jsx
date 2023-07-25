import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import Profile from "./Profile";
import Uploads from "./Uploads";
import Notifications from "./Notifications";
import SearchBox from "./SearchBox";
import SignIn from "./SignIn";
import ToggleColorButton from "./ToggleColorButton";
import { Box, AppBar, Toolbar, useMediaQuery } from "@mui/material";
import SearchButton from "./SearchButton";
import MobileSearchBox from "./MobileSearchBox";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.only("md"));
  const [showSerachBox, setShowSearchBox] = useState(false);
  const [showMobileToolbar, setShowMobileToolbar] = useState(false);

  const handleShowSearchBox = (value) => {
    setShowSearchBox(value);
    setShowMobileToolbar(value);
  };

  useEffect(() => {
    if (isXs) {
      setShowMobileToolbar(false);
      setShowSearchBox(true);
    } else {
      setShowSearchBox(false);
      setShowMobileToolbar(showSerachBox);
    }
  }, [isXs, showSerachBox]);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        zIndex: (theme) => (!isMd ? theme.zIndex.drawer + 1 : null),
      }}
    >
      {showMobileToolbar ? (
        <MobileSearchBox handleShowSearchBox={handleShowSearchBox} />
      ) : (
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "end",
              }}
            >
              <Box width="100%" sx={{ display: { xs: "block", sm: "none" } }}>
                <SearchButton handleShowSearchBox={handleShowSearchBox} />
              </Box>

              <Uploads />
              <Notifications />
              <Profile />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box width="100%" sx={{ display: { xs: "block", sm: "none" } }}>
                <SearchButton handleShowSearchBox={handleShowSearchBox} />
              </Box>

              <SignIn />
              <ToggleColorButton />
            </Box>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;

// showSerachBox ? (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: (theme) => theme.zIndex.drawer + 1,
//         boxShadow: { md: 0 },
//         display: { sm: "none" },
//       }}
//     >
//       <Toolbar
//         disableGutters
//         sx={{
//           height: "65px",
//           paddingX: "18px",
//           display: "flex",
//           // justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Logo />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   )
