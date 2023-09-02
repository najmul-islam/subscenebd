import { Box, Card, Grid, Skeleton } from "@mui/material";

const ShortFilmSearchSkeleton = () => {
  return (
    <Grid item>
      <Card
        sx={{
          width: { xs: "138px", sm: "160px" },
          height: { xs: "250px", sm: "250px" },
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ height: { xs: "207px", sm: "207px" }, padding: "0" }}
        />
        <Box padding="3px">
          <Skeleton height="18px" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="40px" height="14px" />
            <Skeleton width="50px" height="14px" />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
export default ShortFilmSearchSkeleton;
