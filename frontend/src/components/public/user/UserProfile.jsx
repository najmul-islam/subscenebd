import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../features/user/userApi";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import UserSubtitleList from "./UserSubtitleList";
import moment from "moment";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const UserProfile = () => {
  const { userId } = useParams();

  const { data: user, isLoading, isError, error } = useGetUserQuery(userId);
  console.log(user);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <Stack direction="row" spacing={2}>
          <Card
            sx={{
              width: { xs: "138px", sm: "150px" },
              transition: "transform 0.3s",
              zIndex: "1",
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              image={`${avatar_url}${user?.avatar}`}
              sx={{ height: "200px" }}
              alt={user?.name}
            />
          </Card>

          <Box>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="subtitle2">
              {moment(user.createdAt).startOf("m").fromNow()} registered
            </Typography>
            <Typography variant="subtitle2">
              {user?.subtitles.length} Subtitles
            </Typography>
            <Typography display="flex" alignItems="center" variant="subtitle2">
              {user?.posts.length < 2
                ? `${user?.posts.length} blog post`
                : `${user?.posts.length} blog posts`}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ fontSize: "20px", fontWeight: "700", marginY: "20px" }}>
        Subtitle List
      </Divider>

      <Box>
        <UserSubtitleList subtitles={user?.subtitles} />
      </Box>
    </Box>
  );
};
export default UserProfile;
