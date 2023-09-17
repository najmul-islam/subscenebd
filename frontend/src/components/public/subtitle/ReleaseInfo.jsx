import { Box, Divider, Typography } from "@mui/material";

const ReleaseInfo = ({ releaseName }) => {
  return (
    <Box minHeight="200px" paddingY={3} sx={{ wordWrap: "break-word" }}>
      <Divider
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        Release info
      </Divider>

      {releaseName?.map((name, id) => (
        <Typography variant="body2" key={id} marginBottom={1}>
          {name}
        </Typography>
      ))}
    </Box>
  );
};
export default ReleaseInfo;
