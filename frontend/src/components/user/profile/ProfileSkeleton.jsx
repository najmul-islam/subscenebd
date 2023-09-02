import { Box, Skeleton, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const ProfileSkeleton = () => {
  const { drawerWidth } = useSelector((state) => state.theme);
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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Box>
          <Skeleton
            variant="rectangular"
            width={220}
            height={300}
            sx={{ borderRadius: "5px" }}
          />
        </Box>

        <Box>
          <Skeleton variant="text" width={250} sx={{ fontSize: "24px" }} />
          <Skeleton variant="text" width={200} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={180} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={150} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={120} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={120} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={120} sx={{ fontSize: "14px" }} />
          <Skeleton variant="text" width={120} sx={{ fontSize: "14px" }} />
        </Box>
      </Stack>
    </Box>
  );
};
export default ProfileSkeleton;
