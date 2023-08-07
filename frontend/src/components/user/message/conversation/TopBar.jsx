import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const TopBar = ({ partner }) => {
  return (
    <AppBar
      sx={{
        position: "fixed",
        top: "65px",
        left: { lg: "280px", xm: "0" },
        width: "100%",
        background: "#ffffff",
        boxShadow: 0,
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
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
        <Stack
          key={partner?._id}
          direction="row"
          spacing={1}
          alignItems="center"
          // sx={{ background: "#000000" }}
        >
          <Avatar
            alt={partner?.name}
            src={`${avatar_url}/${partner?.avatar}`}
          />
          <Typography color="#000000">{partner?.name}</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
