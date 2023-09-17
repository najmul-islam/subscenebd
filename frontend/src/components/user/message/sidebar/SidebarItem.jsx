import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleListitem } from "../../../../features/theme/themeSlice";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const SidebarItem = ({ conversation }) => {
  const { user } = useSelector((state) => state.auth);
  const { selectedUrl } = useSelector((state) => state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListItem = (link) => {
    navigate(link);
    dispatch(toggleListitem(link));
  };

  const otherParticipants = conversation?.participants?.find(
    (participant) => participant._id !== user._id
  );

  const lastMessageTime = moment(conversation?.lastMessage?.createdAt);
  const duration = moment.duration(moment().diff(lastMessageTime));

  const minutes = duration.asMinutes();
  const hours = duration.asHours();
  const days = duration.asDays();
  const weeks = duration.asWeeks();
  const years = duration.asYears();

  let formattedTimeDifference = "";
  if (minutes >= 1 && minutes <= 60) {
    formattedTimeDifference = `${Math.floor(minutes)}m`;
  } else if (hours >= 1 && hours <= 24) {
    formattedTimeDifference = `${Math.floor(hours)}h`;
  } else if (days >= 1 && days <= 7) {
    formattedTimeDifference = `${Math.floor(days)}d`;
  } else if (weeks >= 1 && weeks <= 52) {
    formattedTimeDifference = `${Math.floor(weeks)}w`;
  } else if (years >= 1) {
    formattedTimeDifference = `${Math.floor(years)}y`;
  } else {
    formattedTimeDifference = "just now";
  }

  return (
    <>
      <ListItem
        key={otherParticipants._id}
        onClick={() => handleListItem(otherParticipants._id)}
        disableGutters
        disablePadding
        sx={{ paddingX: "10px" }}
      >
        <ListItemButton
          disableGutters
          selected={selectedUrl === otherParticipants._id}
          sx={{ paddingX: "5px", borderRadius: "10px" }}
        >
          <ListItemAvatar
            sx={{ width: "50px", height: "50px", marginRight: "5px" }}
          >
            <Avatar
              sx={{ width: "50px", height: "50px" }}
              src={`${avatar_url}/${otherParticipants.avatar}`}
            />
          </ListItemAvatar>
          <ListItemText
            primary={otherParticipants.name}
            secondary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {conversation?.lastMessage?.sender === user._id
                  ? "You: "
                  : null}
                {conversation?.lastMessage?.text}. {formattedTimeDifference}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarItem;
