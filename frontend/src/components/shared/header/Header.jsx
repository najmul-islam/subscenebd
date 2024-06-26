import { AppBar, Box, Stack, Toolbar, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../../features/user/usersApi";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";
import Logo from "./Logo";
import MessageButton from "./MessageButton";
import MobileSearchBox from "./MobileSearchBox";
import NotificationButton from "./NotificationButton";
import ProfileButton from "./ProfileButton";
import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";
import SigninButton from "./SigninButton";
import ThemeButton from "./ThemeButton";
import UploadButton from "./UploadButton";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  // const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
        // zIndex: (theme) => (isMd ? theme.zIndex.drawer + 1 : null),
        zIndex: (theme) => theme.zIndex.drawer + 1,
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
                  <ProfileSkeleton />
                </Stack>
              ) : (
                <>
                  <UploadButton />
                  <MessageButton />
                  <NotificationButton />
                  <ProfileButton user={profile} />
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
