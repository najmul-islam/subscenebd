import { Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircleOutlined } from "@mui/icons-material";

const SigninButton = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Button
      component={Link}
      to="/login"
      variant="outlined"
      startIcon={<AccountCircleOutlined />}
      sx={{
        textTransform: "none",
        borderRadius: "20px",
        width: "102px",
        outlineColor: isDarkMode ? "#28384F" : "#DFF1FE",
        borderColor: isDarkMode ? "#28384F" : "#DFF1FE",
        color: isDarkMode ? "#3ea6ff" : "#065fd4",
        "&:hover": {
          background: isDarkMode ? "#28384F" : "#DFF1FE",
          outlineColor: isDarkMode ? "#28384F" : "#DFF1FE",
          borderColor: isDarkMode ? "#28384F" : "#DFF1FE",
        },
      }}
    >
      Sing in
    </Button>
  );
};

export default SigninButton;
