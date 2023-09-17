import { Avatar, Box, Skeleton, Stack, Typography } from "@mui/material";

const UserInfoSkeleton = () => {
  return (
    <Stack direction="row" spacing={1} marginTop={3} alignItems="center">
      <Skeleton variant="rounded" sx={{ borderRadius: "5px" }}>
        <Avatar
          variant="rounded"
          sx={{ width: "40px", height: "40px", cursor: "pointer" }}
        />
      </Skeleton>
      <Stack direction="column">
        <Box alignContent="center">
          <Skeleton variant="text" width={200} sx={{ fontSize: "14px" }} />
        </Box>

        <Skeleton variant="text" width={100} sx={{ fontSize: "12px" }} />
      </Stack>
    </Stack>
  );
};
export default UserInfoSkeleton;
