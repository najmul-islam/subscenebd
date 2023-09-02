import { Grid, Skeleton, Stack } from "@mui/material";

const ConversationSkeleton = () => {
  return (
    <Grid container paddingX={2} overflow="hidden">
      <Grid item xs={6}>
        <Stack spacing={3}>
          {[...Array(20)].map((subtitle, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              //   width={500}
              width={`${Math.floor(Math.random() * (300 - 100 + 1)) + 100}px`}
              height={30}
              sx={{ borderRadius: "0 20px 20px 0" }}
            />
          ))}
        </Stack>
      </Grid>

      <Grid item xs={6} paddingTop={3}>
        <Stack spacing={3} alignItems="end">
          {[...Array(20)].map((subtitle, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              width={`${Math.floor(Math.random() * (300 - 100 + 1)) + 100}px`}
              height={30}
              sx={{ borderRadius: "20px 0 0 20px" }}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};
export default ConversationSkeleton;
