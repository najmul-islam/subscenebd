import { Box, Card, Grid, Skeleton } from "@mui/material";

const SubtitleItemSkeleton = () => {
  return (
    <Grid item>
      <Card
        sx={{
          width: { xs: "160px", sm: "160px" },
          height: { xs: "271px", sm: "290px" },
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ height: { xs: "207px", sm: "225px" }, padding: "0" }}
        />
        <Box padding="3px">
          <Skeleton height="18px" />
          <Skeleton width="130px" height="16px" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="40px" height="14px" />
            <Skeleton width="50px" height="14px" />
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
export default SubtitleItemSkeleton;
