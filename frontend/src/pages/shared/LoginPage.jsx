import React from "react";
import { Link } from "react-router-dom";
// material-ui
import { Grid, Stack, Typography } from "@mui/material";
// project import
import Login from "../components/auth/Login";
// import AuthWrapper from "../components/auth/AuthWrapper";

const LoginPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h4">Login</Typography>
          <Typography
            component={Link}
            to="/register"
            variant="body1"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            Don't have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
