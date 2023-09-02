import { Box, Skeleton, Stack } from "@mui/material";

const UserProfileSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton
        variant="rectangular"
        width={150}
        height={200}
        sx={{
          width: { xs: "138px", sm: "150px" },
          borderRadius: "5px",
        }}
      />

      <Box>
        <Skeleton variant="text" width={200} sx={{ fontSize: "24px" }} />
        <Skeleton variant="text" width={180} sx={{ fontSize: "14px" }} />
        <Skeleton variant="text" width={130} sx={{ fontSize: "14px" }} />
        <Skeleton variant="text" width={100} sx={{ fontSize: "14px" }} />
      </Box>
    </Stack>
  );
};
export default UserProfileSkeleton;
