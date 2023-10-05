import { AppBar, Avatar, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TopBar = ({ partner }) => {
  return (
    <AppBar
      sx={{
        position: "fixed",
        top: "65px",
        left: { lg: "280px", xm: "0" },
        width: "100%",
        boxShadow: "0",
        background: (theme) => theme.palette.background.default,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
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
          padding={1}
          component={Link}
          to={`/user/${partner?._id}`}
          sx={{
            textDecoration: "none",
            "&:hover": {
              background: (theme) => theme.palette.background.secondary,
              borderRadius: "10px",
            },
          }}
        >
          <Avatar alt={partner?.name} src={partner?.avatar} />
          <Typography color={(theme) => theme.palette.text.primary}>
            {partner?.name}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
