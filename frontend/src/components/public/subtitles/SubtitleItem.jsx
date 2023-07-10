import React from "react";
import moment from "moment";
import { Card, CardMedia, Grid, Typography, Box, Divider } from "@mui/material";
import { DownloadRounded, AccessTimeRounded } from "@mui/icons-material";

const img_url = process.env.REACT_APP_IMG_API;

const SubtitleItem = ({ subtitle }) => {
  // format fun
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

  // console.log(subtitle);
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
          2012
        </Typography>
        <CardMedia
          component="img"
          image={`${img_url}${subtitle?.poster_path}`}
          // sx={{ height: "200px" }}
          alt={subtitle?.title}
        />
        <Typography
          variant="subtitle2"
          paddingX="3px"
          noWrap
          title={subtitle?.title}
        >
          {subtitle?.title}
        </Typography>

        <Typography variant="body2" paddingX="3px" noWrap>
          {subtitle?.user?.name}
        </Typography>
        <Typography
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
            }}
          >
            <AccessTimeRounded sx={{ fontSize: "13px", marginRight: "3px" }} />
            {moment(subtitle.createdAt).startOf("hour").fromNow()}
          </Box>
        </Typography>
      </Card>
    </Grid>
  );
};

export default SubtitleItem;
