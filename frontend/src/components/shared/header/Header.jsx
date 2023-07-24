import { useState } from "react";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import Profile from "./Profile";
import Uploads from "./Uploads";
import Notifications from "./Notifications";
import SearchBox from "./SearchBox";
import SignIn from "./SignIn";
import ToggleColorButton from "./ToggleColorButton";
import { Box, AppBar, Toolbar } from "@mui/material";
import SearchButton from "./SearchButton";
import MobileSearchBox from "./MobileSearchBox";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const [showSerachBox, setShowSearchBox] = useState(false);

  const handleShowSearchBox = (value) => {
    setShowSearchBox(value);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 0,
      }}
    >
      {showSerachBox ? (
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
                justifyContent: "end",
              }}
            >
              <SearchButton handleShowSearchBox={handleShowSearchBox} />
              <Uploads />
              <Notifications />
              <Profile />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <SearchButton handleShowSearchBox={handleShowSearchBox} />
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
