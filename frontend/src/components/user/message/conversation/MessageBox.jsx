import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Tooltip,
} from "@mui/material";
import { Clear, Search as SearchIcon, Send } from "@mui/icons-material";
import { useCreateMessageMutation } from "../../../../features/messages/messageApi";

const MessageBox = () => {
  const [messageValue, setMessageValue] = useState("");
  const [createMessage] = useCreateMessageMutation();
  const { conversationId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageValue !== "") {
      createMessage({ conversationId, data: { text: messageValue } });
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
        sx={{
          paddingX: "10px",
          minHeight: "40px",
          borderRadius: "40px",
          boxShadow: "inset 0 1px 5px #eee",
          border: "1px solid #cccccc",
          "&:focus": { border: "1px solid #2395D3" },
        }}
      />

      <IconButton type="submit" disabled={messageValue === "" ? true : false}>
        <Send />
      </IconButton>
    </Box>
  );
};
export default MessageBox;
