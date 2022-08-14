import React from "react";
import { Link } from "react-router-dom";
// material-ui
import { Grid, Stack, Typography } from "@mui/material";
// project import
import Register from "../components/auth/Register";

const RegisterPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography variant="h4">Register</Typography>
          <Typography
            component={Link}
            to="/login"
            variant="body1"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            Already have an account?
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Register />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
