import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
// material-ui
import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

import * as Yup from "yup";
import { useFormik } from "formik";

import SocialLogin from "./SocialLogin";

import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useRegisterMutation } from "../../../features/auth/authApi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [register, { isError, isSuccess, error }] = useRegisterMutation();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  });

  const onSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      setStatus({ success: false });
      setSubmitting(false);
      register(values);
    } catch (err) {
      console.error(err);
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.error);
    }
    if (isSuccess || user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, navigate, dispatch, error]);

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = formik;

  return (
    <>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="name-signup">User name*</InputLabel>
              <OutlinedInput
                id="name-login"
                type="name"
                value={values.name}
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="user name"
                fullWidth
                error={Boolean(touched.name && errors.name)}
              />
              {touched.name && errors.name && (
                <FormHelperText error id="helper-text-name-signup">
                  {errors.name}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(touched.email && errors.email)}
                id="email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="email"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email-signup">
                  {errors.email}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-signup">Password*</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(touched.password && errors.password)}
                id="password-signup"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? (
                        <VisibilityOutlined />
                      ) : (
                        <VisibilityOffOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password-signup">
                  {errors.password}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              By Signing up, you agree to our &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          {errors.submit && (
            <Grid item xs={12} md={6}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Account
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Divider>
              <Typography variant="caption">Sign up with</Typography>
            </Divider>
          </Grid>
          <Grid item xs={12} md={6}>
            <SocialLogin />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Register;
