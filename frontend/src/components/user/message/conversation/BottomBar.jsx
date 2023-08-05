import { AppBar, Toolbar, Typography } from "@mui/material";
import MessageBox from "./MessageBox";

const BottomBar = () => {
  return (
    <AppBar
      sx={{
        position: "fixed",
        top: "auto",
        bottom: "0",
        left: { lg: "280px", xm: "0" },
        width: "100%",
        boxShadow: "0",
        background: "#ffffff",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "65px",
          paddingX: "18px",
          //   display: "flex",
          //   justifyContent: "space-between",
        }}
      >
        <MessageBox />
      </Toolbar>
    </AppBar>
  );
};
export default BottomBar;
