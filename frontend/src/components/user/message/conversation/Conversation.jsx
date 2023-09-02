import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userApi } from "../../../../features/user/usersApi";
import { useGetMessagesQuery } from "../../../../features/messages/messageApi";
import { toggleUserSearchFocus } from "../../../../features/theme/themeSlice";
import { userSearch } from "../../../../features/user/userSlice";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Messages from "./Messages";
import ConversationSkeleton from "./ConversationSkeleton";

const Conversation = () => {
  const [partner, setPartner] = useState({});
  const { partnerId } = useParams();
  const dispatch = useDispatch();
  const {
    data: messages,
    isLoading,
    isError,
    error,
  } = useGetMessagesQuery(partnerId);

  // if click out side of search box it lost his focus
  const handleFocus = () => {
    dispatch(toggleUserSearchFocus(false));
    dispatch(userSearch(""));
  };

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate(partnerId))
      .unwrap()
      .then((data) => setPartner(data));
  }, [dispatch, partnerId]);

  // console.log(messages);
  if (isLoading) return <ConversationSkeleton />;
  return (
    <Box
      position="relative"
      sx={{ overflowY: "auto", height: "calc(100vh - 210px)" }}
      paddingBottom={2}
      paddingX={2}
      onClick={handleFocus}
    >
      <TopBar partner={partner} />

      <Messages partner={partner} messages={messages} />

      <BottomBar isLoading={isLoading} messages={messages} />
    </Box>
  );
};
export default Conversation;
