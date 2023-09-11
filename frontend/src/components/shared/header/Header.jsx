import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../../features/user/usersApi";
import Logo from "./Logo";
import Profile from "./Profile";
import Uploads from "./Uploads";
import Notifications from "./Notifications";
import SearchBox from "./SearchBox";
import ThemeButton from "./ThemeButton";
import SigninButton from "./SigninButton";
import SearchButton from "./SearchButton";
import MobileSearchBox from "./MobileSearchBox";
import { Box, AppBar, Toolbar, useMediaQuery, Stack } from "@mui/material";
import ProfileSkeleton from "./ProfileSkeleton";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const isMd = useMediaQuery((theme) => theme.breakpoints.only("md"));
  const [showSerachBox, setShowSearchBox] = useState(false);
  const [showMobileToolbar, setShowMobileToolbar] = useState(false);

  // const { data: profile, isLoading } = useGetUserProfileQuery();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    if (user) {
      dispatch(userApi.endpoints.getUserProfile.initiate())
        .unwrap()
        .then((data) => {
          setProfile(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // setIsError(true);
          // setError(error);
        });
    }
    // if (!user) {
    //   dispatch(apiSlice.util.invalidateTags(["User"]));
    // }
  }, [dispatch, user]);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        background: (theme) => theme.palette.background.default,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
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
            <Stack
              spacing={1}
              direction="row"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box width="100%" sx={{ display: { xs: "block", sm: "none" } }}>
                <SearchButton handleShowSearchBox={handleShowSearchBox} />
              </Box>

              {isLoading ? (
                <Stack direction="row" spacing={2}>
                  <ProfileSkeleton />
                  <ProfileSkeleton />
                  <ProfileSkeleton />
                </Stack>
              ) : (
                <>
                  <Uploads />
                  <Notifications />
                  <Profile user={profile} />
                </>
              )}
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <SearchButton handleShowSearchBox={handleShowSearchBox} />
              </Box>

              <ThemeButton />
              <SigninButton />
            </Stack>
          )}
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;
