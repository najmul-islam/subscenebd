import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRegisterMutation } from "../../../features/auth/authApi";
import SocialLogin from "./SocialLogin";

// material-ui
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // check breckpoint up to lg
  const isLgOrUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  // rtk
  const { drawerWidth } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const [register, { isError, isSuccess, error }] = useRegisterMutation();

  // form value
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // validate shema
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required("Name is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  });

  // handle submit
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

  // formik
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
      navigate("/login");
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
    <Box
      display="flex"
      justifyContent="center"
      paddingY={5}
      sx={{
        // width: isLgOrUp ? `calc(100% - ${drawerWidth}px)` : "100%",
        width: {
          lg: `calc(100% - ${drawerWidth}px)`,
          xs: "100%",
        },
      }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          paddingY: "20px",
          paddingX: "30px",
          // minWidth: "500px",
          border: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          direction="row"
          marginBottom={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="800">
            Registration
          </Typography>
          <Typography
            component={RouterLink}
            to="/login"
            variant="subtitle2"
            sx={{ textDecoration: "none" }}
            color="primary"
          >
            All ready have an account?
          </Typography>
        </Stack>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={1} marginBottom={3}>
            <InputLabel htmlFor="name-signup">User name*</InputLabel>
            <OutlinedInput
              id="name-login"
              type="name"
              value={values.name}
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="User name"
              fullWidth
              error={Boolean(touched.name && errors.name)}
              sx={{ height: "45px" }}
            />
            {touched.name && errors.name && (
              <FormHelperText error id="helper-text-name-signup">
                {errors.name}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
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
              placeholder="Email"
              sx={{ height: "45px" }}
            />
            {touched.email && errors.email && (
              <FormHelperText error id="helper-text-email-signup">
                {errors.email}
              </FormHelperText>
            )}
          </Stack>

          <Stack spacing={1} marginBottom={3}>
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
              placeholder="Password"
              inputProps={{}}
              sx={{ height: "45px" }}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="helper-text-password-signup">
                {errors.password}
              </FormHelperText>
            )}
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            marginBottom={3}
          >
            <Typography variant="caption">
              By Signing up, you agree to our &nbsp;
              <Link
                variant="caption"
                fontWeight="bold"
                component={RouterLink}
                to="#"
              >
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link
                variant="caption"
                fontWeight="bold"
                component={RouterLink}
                to="#"
              >
                Privacy Policy
              </Link>
            </Typography>
          </Stack>
          {errors.submit && (
            <FormHelperText error>{errors.submit}</FormHelperText>
          )}

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

          <Stack marginY={3}>
            <Divider>
              <Typography variant="caption">Sign up with</Typography>
            </Divider>
          </Stack>

          <SocialLogin />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
