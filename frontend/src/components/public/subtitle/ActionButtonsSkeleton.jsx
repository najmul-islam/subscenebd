import { Box, Skeleton, Stack } from "@mui/material";

const ActionButtonsSkeleton = () => {
  return (
    <Box>
      <Stack direction="row" spacing={2} marginTop="25px">
        <Skeleton
          variant="rectangular"
          width={120}
          height={36}
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="rectangular"
          width={65}
          height={36}
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="rectangular"
          width={65}
          height={36}
          sx={{ borderRadius: "5px" }}
        />
        <Skeleton
          variant="rectangular"
          width={65}
          height={36}
          sx={{ borderRadius: "5px" }}
        />
      </Stack>
    </Box>
  );
};
export default ActionButtonsSkeleton;
