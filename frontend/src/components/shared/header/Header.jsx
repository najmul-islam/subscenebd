import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  useGetUserProfileQuery,
  userApi,
} from "../../../features/user/usersApi";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.only("md"));
  const [showSerachBox, setShowSearchBox] = useState(false);
  const [showMobileToolbar, setShowMobileToolbar] = useState(false);

  const { data: profile, isLoading } = useGetUserProfileQuery();
  // const [profile, setProfile] = useState({});
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   dispatch(userApi.endpoints.getUserProfile.initiate())
  //     .unwrap()
  //     .then((data) => {
  //       setProfile(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       setIsError(true);
  //       setError(error);
  //     });
  // }, [dispatch]);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#ffffff",
        boxShadow: 0,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
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
              {isLoading ? null : <Profile user={profile} />}
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
