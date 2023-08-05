import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../../features/messages/messageApi";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
  const { partnerId } = useParams();
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useGetMessagesQuery(partnerId);

  console.log("messages", messages);
  if (isLoading) return <h1>Loading...</h1>;

  if (messages && messages.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignContent="center">
        <Typography>There are no message with this user</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((message) => {
        // const justify = message.sender._id !== user._id ? "start" : "end";
        return <Message key={message?._id} message={message} />;
      })}
    </Box>
  );
};
export default Messages;
