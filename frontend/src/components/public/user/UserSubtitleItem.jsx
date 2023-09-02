import { AccessTimeRounded, DownloadRounded } from "@mui/icons-material";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import wordsToNumbers from "words-to-numbers";

const img_url = process.env.REACT_APP_IMG_API;
const UserSubtitleItem = ({ subtitle }) => {
  // format number
  const formatNumber = (number = 0) => {
    if (Math.abs(number) >= 1e9) {
      return (number / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (Math.abs(number) >= 1e6) {
      return (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (Math.abs(number) >= 1e3) {
      return (number / 1e3).toFixed(2).replace(/\.0$/, "") + "K";
    }
    return number.toString();
  };

  // format season -> word to number
  const formatSeason = (title) => {
    return wordsToNumbers(title?.split("-")[1].split(" ")[1]);
  };
  return (
    <Grid item>
      <Card
        sx={{
          width: { xs: "138px", sm: "150px" },
          transition: "transform 0.3s",
          zIndex: "1",
          position: "relative",
          // "&:hover": { transform: "scale(1.1)" },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            color: "#fff",
            fontSize: "14px",
            fontWeight: "600",
            padding: "0px 3px",
            background: "#0000006f",
          }}
        >
          {subtitle?.release_date}
        </Typography>
        {subtitle?.media_type === "series" ? (
          <Typography
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              padding: "0px 3px",
              background: "#0000006f",
            }}
            title={subtitle?.title.split("-")[1]}
          >
            S-{formatSeason(subtitle?.title)}
          </Typography>
        ) : null}
        <Box component={Link} to={`/subtitles/${subtitle?._id}`}>
          <CardMedia
            component="img"
            image={`${img_url}${subtitle?.poster_path}`}
            // sx={{ height: "200px" }}
            alt={subtitle?.title}
          />
        </Box>

        <Box
          component={Link}
          to={`/subtitles/${subtitle?._id}`}
          sx={{
            textDecoration: "none",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          <Typography
            variant="subtitle2"
            paddingX="3px"
            noWrap
            title={subtitle?.title}
          >
            {subtitle?.title}
          </Typography>
        </Box>

        {/* <Box
          component={Link}
          to={`/user/${subtitle.user._id}`}
          sx={{ textDecoration: "none", color: "#000000" }}
        >
          <Typography variant="body2" paddingX="3px" noWrap>
            {subtitle?.user?.name}
          </Typography>
        </Box> */}

        <Box
          sx={{
            paddingX: "3px",
            paddingBottom: "3px",
            fontSize: "13px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
            title={`${subtitle?.downloads} time downloads`}
          >
            <DownloadRounded sx={{ fontSize: "13px", marginRight: "3px" }} />
            {formatNumber(subtitle?.downloads)}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            <AccessTimeRounded sx={{ fontSize: "13px", marginRight: "3px" }} />
            {moment(subtitle.createdAt).startOf("m").fromNow()}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
export default UserSubtitleItem;
