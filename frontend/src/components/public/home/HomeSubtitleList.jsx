// import { Swiper, SwiperSlide, swiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSubtitleItem from "./HomeSubtitleItem";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";

import { KeyboardArrowDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
const HomeSubtitleList = ({ title, icon, subtitles, link }) => {
  return (
    <Stack marginBottom={2}>
      <Typography
        variant="h6"
        sx={{
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SvgIcon
          component={icon}
          sx={{ marginRight: "10px", color: "#FA0019" }}
        />
        {title}
        {/* Popular Tv-sereis */}
      </Typography>
      <Grid container spacing={2}>
        {subtitles?.map((subtitle) => (
          <HomeSubtitleItem key={subtitle._id} subtitle={subtitle} />
        ))}
      </Grid>

      <Tooltip title="Show more">
        <Box
          component={Link}
          to={`${link}`}
          sx={{
            width: "100%",
            height: "40px",
            // border: (theme) => `1px solid ${theme.palette.divider}`,
            marginY: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "5px",
            // background: (theme) => theme.palette.background.paper,
            "&:hover": {
              background: (theme) => theme.palette.background.secondary,
              border: "none",
            },
          }}
        >
          <KeyboardArrowDown
            sx={{
              fontSize: "35px",
              fontWeight: "400",
              color: (theme) => theme.palette.text.secondary,
            }}
          />
        </Box>
      </Tooltip>
      <Box>
        <Divider sx={{ borderBottomWidth: "3px" }} />
      </Box>
    </Stack>
  );
};
export default HomeSubtitleList;
