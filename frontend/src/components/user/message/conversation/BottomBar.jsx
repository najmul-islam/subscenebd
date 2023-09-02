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
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        background: (theme) => theme.palette.background.default,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "65px",
          paddingX: "18px",
        }}
      >
        {messages?.length === 0 ? (
          <CreateConversation />
        ) : (
          <CreateMessage messages={messages} />
        )}
      </Toolbar>
    </AppBar>
  );
};
export default BottomBar;
