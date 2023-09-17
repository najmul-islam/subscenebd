import { useState } from "react";
import { useParams } from "react-router-dom";
import { Send } from "@mui/icons-material";
import { Box, IconButton, InputBase, Tooltip } from "@mui/material";
import { useCreateMessageMutation } from "../../../../features/messages/messageApi";
import { useSelector } from "react-redux";

const CreateMessage = () => {
  const [messageValue, setMessageValue] = useState("");
  const [createMessage] = useCreateMessageMutation();
  const { partnerId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageValue !== "") {
      createMessage({
        senderId: user._id,
        partnerId: partnerId,
        data: { text: messageValue, createdAt: new Date().toISOString() },
      });
      setMessageValue("");
    }
  };

  const handleMessage = (e) => {
    setMessageValue(e.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      sx={{
        flex: { lg: "0 2 calc(100% - 280px)", xs: "0 2 100%" },
      }}
    >
      <InputBase
        fullWidth
        placeholder="Aa"
        name="message"
        value={messageValue}
        onChange={handleMessage}
        // multiline
        // sx={{
        //   paddingX: "10px",
        //   minHeight: "40px",
        //   borderRadius: "40px",
        //   boxShadow: "inset 0 1px 5px #eee",
        //   border: "1px solid #cccccc",
        //   "&:focus": { border: "1px solid #2395D3" },
        // }}
        sx={{
          paddingLeft: "20px",
          height: "40px",
          borderRadius: "40px",
          boxShadow: (theme) =>
            `inset 0 1px 5px ${theme.palette.background.secondary}`,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          // "&:focus-within": { border: "1px solid #2962B7" },
        }}
      />

      <IconButton
        type="submit"
        title="Send"
        disabled={messageValue === "" ? true : false}
      >
        <Send />
      </IconButton>
    </Box>
  );
};
export default CreateMessage;
