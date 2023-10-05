import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../features/user/usersApi";
import {
  Box,
  Card,
  CardMedia,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import UserSubtitleList from "./UserSubtitleList";
import moment from "moment";
import { useSelector } from "react-redux";
import UserProfileSkeleton from "./UserProfileSkeleton";
import UserSubtitleItemSkeleton from "./UserSubtitleItemSkeleton";

const UserProfile = () => {
  const { userId } = useParams();
  const { drawerWidth } = useSelector((state) => state.theme);
  const { data: user, isLoading, isError, error } = useGetUserQuery(userId);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ width: { lg: `calc(100% - ${drawerWidth}px)` }, xs: "100%" }}
      >
        {isLoading ? (
          <UserProfileSkeleton />
        ) : (
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
                image={user?.avatar}
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
              <Typography
                display="flex"
                alignItems="center"
                variant="subtitle2"
              >
                {user?.posts.length < 2
                  ? `${user?.posts.length} blog post`
                  : `${user?.posts.length} blog posts`}
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>

      <Divider
        sx={{
          fontSize: "20px",
          fontWeight: "700",
          marginY: "20px",
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          xs: "100%",
        }}
      >
        Subtitle List
      </Divider>

      <Box>
        {isLoading ? (
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ height: "89vh", overflowY: "hidden" }}
          >
            {[...Array(36)].map((subtitle, i) => (
              <Grid item key={i}>
                <UserSubtitleItemSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : (
          <UserSubtitleList subtitles={user?.subtitles} />
        )}
      </Box>
    </Box>
  );
};
export default UserProfile;
