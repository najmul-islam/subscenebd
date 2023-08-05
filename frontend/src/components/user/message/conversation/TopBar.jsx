import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../../../../features/user/usersApi";
const avatar_url = process.env.REACT_APP_AVATAR_URL;

const TopBar = () => {
  const { parterId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data: partner, isLoading } = useGetUserProfileQuery(parterId);

  // const otherParticipants = conversation?.participants?.find(
  //   (participant) => participant._id !== user._id
  // );

  console.log("partner", partner);
  return (
    <AppBar
      sx={{
        position: "fixed",
        top: "65px",
        left: { lg: "280px", xm: "0" },
        width: "100%",
        background: "#ffffff",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: "65px",
          paddingX: "18px",
          //   display: "flex",
          //   justifyContent: "space-between",
        }}
      >
        {/* <Stack
          key={otherParticipants?._id}
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Avatar
            alt={otherParticipants?.name}
            src={`${avatar_url}/${otherParticipants?.avatar}`}
          />
          <Typography color="#000000">{otherParticipants?.name}</Typography>
        </Stack> */}
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
