import { Badge, IconButton, Tooltip, styled } from "@mui/material";
// import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import { IoChatbox, IoChatboxOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetUnseenMessageQuery,
  usePutUnseenMessageMutation,
} from "../../../features/messages/messageApi";
import { toggleSidebar } from "../../../features/theme/themeSlice";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const MessageButton = () => {
  const { data, isLoading, isError, error } = useGetUnseenMessageQuery();
  const [putUnseenMessage] = usePutUnseenMessageMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleMessageButton = () => {
    dispatch(toggleSidebar(true));
    putUnseenMessage();
    navigate(
      location?.pathname.startsWith("/messages") ? null : navigate("/messages")
    );
  };

  return (
    <Tooltip title="Message">
      <IconButton
        onClick={handleMessageButton}
        sx={{ color: (theme) => theme.palette.text.primary }}
      >
        <StyledBadge
          color="error"
          badgeContent={data?.unseenMessage === 0 ? null : data?.unseenMessage}
          max={9}
        >
          {location?.pathname.startsWith("/messages") ? (
            <IoChatbox style={{ fontSize: "23px" }} />
          ) : (
            <IoChatboxOutline style={{ fontSize: "23px" }} />
          )}
        </StyledBadge>
      </IconButton>
    </Tooltip>
  );
};
export default MessageButton;
