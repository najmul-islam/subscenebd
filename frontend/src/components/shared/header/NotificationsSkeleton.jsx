import { Avatar, MenuItem, Skeleton, Stack } from "@mui/material";
import { Box } from "@mui/system";

const NotificationsSkeleton = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      display="flex"
      alignItems="center"
      marginLeft="15px"
    >
      <Skeleton variant="circular" sx={{ width: "50px", height: "50px" }} />
      <Box>
        <Skeleton sx={{ width: "250px", height: "15px" }} />
        <Skeleton sx={{ width: "180px", height: "15px" }} />
        <Skeleton sx={{ width: "50px", height: "10px" }} />
      </Box>
    </Stack>
  );
};
export default NotificationsSkeleton;
