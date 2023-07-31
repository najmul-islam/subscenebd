import { Box, Typography } from "@mui/material";
import React from "react";

const MessagesPage = () => {
  return (
    <Box
      minHeight="90Vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h6" marginTop="-100px">
        Select a chat or start a new conversation
      </Typography>
    </Box>
  );
};

export default MessagesPage;
