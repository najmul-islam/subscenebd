import { Box, Skeleton, Stack } from "@mui/material";

const SidebarSkeleton = () => {
  return (
    <Stack padding={2} direction="column" spacing={2}>
      <Skeleton
        variant="rounded"
        width={100}
        height={20}
        sx={{ borderRadius: "50px" }}
      />
      <Skeleton variant="rounded" height={35} sx={{ borderRadius: "50px" }} />

      {[...Array(10)].map((subtitle, i) => (
        <Stack key={i} direction="row" spacing={1} alignItems="center">
          <Skeleton variant="circular" width={50} height={50} />
          <Box>
            <Skeleton
              variant="text"
              width={170}
              sx={{ fontSize: "16px", borderRadius: "10px" }}
            />
            <Skeleton
              variant="text"
              width={120}
              sx={{ fontSize: "14px", borderRadius: "8px" }}
            />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};
export default SidebarSkeleton;
