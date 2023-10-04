import { FiberManualRecord } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePutFollowerMutation } from "../../../features/user/usersApi";
import { useSelector } from "react-redux";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const UserInfo = ({ subtitle }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [putFollower] = usePutFollowerMutation();

  const handleFollow = (userId) => {
    if (user) {
      putFollower(userId);
    } else {
      navigate("/login");
    }
  };

  const handleUsername = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Stack direction="row" spacing={1} marginTop={3} alignItems="center">
      <Avatar
        alt={subtitle?.user.name}
        src={subtitle?.user.avatar}
        variant="rounded"
        sx={{ width: "40px", height: "40px", cursor: "pointer" }}
        onClick={() => handleUsername(subtitle?.user._id)}
      />
      <Stack direction="column">
        <Box alignContent="center">
          <Typography
            onClick={() => handleUsername(subtitle?.user._id)}
            component="span"
            variant="subtitle2"
            sx={{ cursor: "pointer" }}
          >
            {subtitle?.user.name}
          </Typography>
          {user?._id !== subtitle?.user._id && (
            <>
              <FiberManualRecord
                sx={{
                  fontSize: "5px",
                  marginBottom: "2px",
                  marginX: "2px",
                }}
              />
              <Typography
                component="span"
                variant="subtitle2"
                sx={{ color: "#1976D2", cursor: "pointer" }}
                onClick={() => handleFollow(subtitle?.user._id)}
              >
                {subtitle?.user.followers.includes(user?._id)
                  ? "Following"
                  : "Follow"}
              </Typography>
            </>
          )}
        </Box>

        <Typography variant="caption">
          {subtitle?.user.followers.length >= 2
            ? `${subtitle?.user.followers.length} followers`
            : `${subtitle?.user.followers.length} follower`}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default UserInfo;
