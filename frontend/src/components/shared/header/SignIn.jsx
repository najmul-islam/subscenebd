import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { AccountCircleOutlined } from "@mui/icons-material";

const SignIn = () => {
  return (
    <Button
      component={Link}
      to="/login"
      variant="outlined"
      startIcon={<AccountCircleOutlined />}
      color="inherit"
    >
      Sing in
    </Button>
  );
};

export default SignIn;
