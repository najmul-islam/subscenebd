import { Box, Card, Divider, Grid, Skeleton, Stack } from "@mui/material";

const HomeSubtitleSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="text" width={120} height={40} />
      <Grid container spacing={2} direction="row">
        {[...Array(9)].map((subtitle, i) => (
          <Grid item>
            <Card
              sx={{
                width: { xs: "138px", sm: "160px" },
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
        ))}
      </Grid>
      <Skeleton variant="text" width="100%" height={70} />
      <Divider sx={{ borderBottomWidth: "3px" }} />
    </Box>
  );
};
export default HomeSubtitleSkeleton;
