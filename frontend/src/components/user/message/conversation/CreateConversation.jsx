import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateConversationMutation } from "../../../../features/conversations/conversationApi";
import { Send } from "@mui/icons-material";
import { Box, IconButton, InputBase } from "@mui/material";

const CreateConversation = () => {
  const [messageValue, setMessageValue] = useState("");
  const { partnerId } = useParams();

  const [createConversation] = useCreateConversationMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (messageValue !== "") {
      createConversation({
        partnerId,
        data: {
          participantId: partnerId,
          text: messageValue,
        },
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
          borderRadius: "40px 0px 0px 40px",
          boxShadow: (theme) =>
            `inset 0 1px 5px ${theme.palette.background.secondary}`,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          "&:focus-within": { border: "1px solid #2962B7" },
        }}
      />

      <IconButton
        type="submit"
        title="Create conversation"
        disabled={messageValue === "" ? true : false}
      >
        <Send />
      </IconButton>
    </Box>
  );
};
export default CreateConversation;
