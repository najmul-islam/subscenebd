import { AppBar, Toolbar } from "@mui/material";
import CreateMessage from "./CreateMessage";
import CreateConversation from "./CreateConversation";

const BottomBar = ({ messages }) => {
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
        }}
      >
        {messages?.length === 0 ? <CreateConversation /> : <CreateMessage />}
      </Toolbar>
    </AppBar>
  );
};
export default BottomBar;
