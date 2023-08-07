import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userApi } from "../../../../features/user/usersApi";
import { useGetMessagesQuery } from "../../../../features/messages/messageApi";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";
import Messages from "./Messages";

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

  useEffect(() => {
    dispatch(userApi.endpoints.getUser.initiate(partnerId))
      .unwrap()
      .then((data) => setPartner(data));
  }, [dispatch, partnerId]);

  console.log(messages);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Box
      position="relative"
      sx={{ overflowY: "auto", height: "calc(100vh - 210px)" }}
      paddingBottom={2}
      paddingX={2}
    >
      <TopBar partner={partner} />

      <Messages partner={partner} messages={messages} />

      <BottomBar messages={messages} />
    </Box>
  );
};
export default Conversation;
