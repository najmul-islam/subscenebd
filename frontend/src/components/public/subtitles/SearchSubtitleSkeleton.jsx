import { Box, Skeleton, Stack } from "@mui/material";

const SearchSubtitleSkeleton = () => {
  return (
    <Box width={{ xs: "100%", sm: "520px" }}>
      <Stack direction="row" spacing={2}>
        <Skeleton
          variant="rectangular"
          sx={{ height: "225px", width: "150px", borderRadius: "5px" }}
        />
        <Box>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={150} height={20} />
          <Skeleton variant="text" width={130} height={15} />
        </Box>
      </Stack>
    </Box>
  );
};
export default SearchSubtitleSkeleton;
