import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { Image } from "mui-image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import unknownUser from "../../../assets/image/unknown-user.png";
import {
  useGetUserProfileQuery,
  usePutUserAvatarMutation,
  usePutUserProfileMutation,
} from "../../../features/user/usersApi";
import ProfileSkeleton from "./ProfileSkeleton";

const Profile = () => {
  const [avatarValue, setAvatarValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isImgChange, setIsImgChange] = useState(false);
  const [isNameChange, setIsNameChange] = useState(false);

  const { drawerWidth } = useSelector((state) => state.theme);
  const { data: profile, isLoading, isError, error } = useGetUserProfileQuery();

  const [putUserAvatar, { isLoading: avatarIsLoading }] =
    usePutUserAvatarMutation();
  const [putUserProfile, { isLoading: nameIsLoading }] =
    usePutUserProfileMutation();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarValue(file);
  };

  const handleAvatarSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatarValue);
    putUserAvatar(formData);
    setAvatarValue("");
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    putUserProfile({ name: nameValue });
    setIsNameChange(false);
  };

  useEffect(() => {
    setNameValue(profile?.name);
  }, [profile]);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      sx={{
        width: {
          lg: `calc(100% - ${drawerWidth}px)`,
          xs: "100%",
        },
      }}
    >
      <Box
        // borderRadius={2}

        sx={{
          textTransform: "none",
        }}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Box>
            <Box
              display="flex"
              marginBottom={2}
              sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
            >
              {avatarIsLoading ? (
                <CircularProgress />
              ) : (
                <Image
                  src={profile.avatar ? profile.avatar : unknownUser}
                  // showLoading={<img src={unknownUser} alt="unknwon-user" />}
                  width={250}
                  sx={{
                    borderRadius: "5px",
                  }}
                />
              )}
            </Box>

            <Box marginBottom={2}>
              <Button
                variant="outlined"
                onClick={() => setIsImgChange(!isImgChange)}
                sx={{ textTransform: "none" }}
              >
                Change profile picture (jpg/jpeg)
              </Button>

              {isImgChange && (
                <Box component="form" onSubmit={handleAvatarSubmit} marginY={1}>
                  <Button
                    variant="outlined"
                    startIcon={<AddPhotoAlternateOutlined />}
                    component="label"
                    sx={{
                      fontWeight: "600",
                      textTransform: "none",
                      marginRight: "19px",
                    }}
                  >
                    Choose image
                    <input
                      hidden
                      accept="image/jpg, image/jpeg"
                      type="file"
                      name="avatar"
                      onChange={handleAvatarChange}
                    />
                  </Button>

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={avatarValue ? false : true}
                    sx={{
                      fontWeight: "600",
                      textTransform: "none",
                    }}
                  >
                    Upload
                  </Button>
                </Box>
              )}
            </Box>

            {avatarValue && (
              <Box
                bgcolor="#d8d8d8"
                padding={1}
                borderRadius={1}
                minHeight={40}
                width={249}
                sx={{ wordWrap: "break-word", lineHeight: "1px" }}
              >
                <Typography variant="caption">{avatarValue?.name}</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ textDecoration: "none" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              {isNameChange ? (
                <Box component="form" onSubmit={handleNameSubmit}>
                  <FormControl>
                    <TextField
                      variant="outlined"
                      fullWidth
                      size="small"
                      id="name"
                      name="name"
                      label="*name"
                      value={nameValue}
                      onChange={(e) => setNameValue(e.target.value)}
                      // sx={{ height: "20px" }}
                    />
                    <FormHelperText
                      sx={{ margin: "2px", fontWeight: "bold", color: "red" }}
                    >
                      Username can be changed only once
                    </FormHelperText>
                  </FormControl>
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ textTransform: "none" }}
                      onClick={() => setIsNameChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      type="submit"
                      disabled={
                        profile.name.trim() === nameValue.trim() ? true : false
                      }
                      sx={{ textTransform: "none" }}
                    >
                      Save
                    </Button>
                  </Stack>
                </Box>
              ) : (
                <Typography variant="h5" noWrap>
                  Name: {profile.name}
                </Typography>
              )}
              {isNameChange ? null : (
                <Button
                  component="span"
                  variant="outlined"
                  size="small"
                  title="You changed your name once"
                  disabled={profile.nameChanged ? true : false}
                  onClick={() => {
                    setIsNameChange(!isNameChange);
                  }}
                  sx={{ textTransform: "none" }}
                >
                  {profile.nameChanged ? "Changed" : "Change"}
                </Button>
              )}
            </Stack>
            <Stack direction="column">
              <Typography
                variant="subtitle2"
                component={Link}
                to={`/user/${profile._id}`}
                sx={{ textDecoration: "none" }}
              >
                _id: {profile._id}
              </Typography>
              <Typography variant="subtitle2">
                Email: {profile.email}
              </Typography>
              <Typography variant="subtitle2">
                Registerd: {moment(profile.createdAt).format("D/MM/YYYY")}
              </Typography>
              <Typography variant="subtitle2">Role: {profile.role}</Typography>
              <Typography variant="subtitle2">
                Followers: {profile.followers.length}
              </Typography>
              <Typography
                component={Link}
                to={`/user/subtitles`}
                variant="subtitle2"
                sx={{ textDecoration: "none" }}
              >
                Subtitles: {profile.subtitles.length}
              </Typography>
              <Typography
                component={Link}
                to={`/user/downloads`}
                variant="subtitle2"
                sx={{ textDecoration: "none" }}
              >
                Downloads: {profile.downloads.length}
              </Typography>
              <Typography variant="subtitle2">
                Posts: {profile.posts.length}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
export default Profile;
