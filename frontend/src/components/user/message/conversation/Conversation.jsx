import { Box, Toolbar, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../../../features/messages/messageApi";
import { useGetConversationQuery } from "../../../../features/conversations/conversationApi";

const Conversation = () => {
  // const { partnerId } = useParams();
  // const { data: conversation, isLoading } = useGetConversationQuery(partnerId);

  // console.log("conversation", conversation);
  // if (isLoading) return <h1>Loading...</h1>;

  return (
    <Box
      position="relative"
      sx={{ overflowY: "auto", height: "calc(100vh - 210px)" }}
      paddingBottom={2}
      paddingX={2}
    >
      <TopBar />

      <Messages />

      <BottomBar />
    </Box>
  );
};
export default Conversation;
