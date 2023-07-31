import { Box, Divider, Typography } from "@mui/material";

const AboutSubtitle = ({ description }) => {
  return (
    <Box minHeight="200px" paddingY={3} sx={{ wordBreak: "break-word" }}>
      <Divider
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        About subtitle
      </Divider>
      <Typography component="p" variant="body1" sx={{ wordWrap: "break-word" }}>
        {description}
      </Typography>
    </Box>
  );
};
export default AboutSubtitle;
