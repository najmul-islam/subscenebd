// import { Swiper, SwiperSlide, swiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
import { useGetSubtitlesQuery } from "../../../features/subtitle/subtitleApi";
import { Box } from "@mui/material";
// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
import SubtitleItem from "../subtitles/SubtitleItem";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const AllSubtitle = () => {
  const page = 1;
  const limit = 12;
  const { data, isLoading, isError, error } = useGetSubtitlesQuery({
    page,
    limit,
  });
  console.log();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Box>
      <Slider {...settings}>
        {data?.subtitles?.map((subtitle) => (
          <Box key={subtitle._id}>
            <SubtitleItem subtitle={subtitle} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
export default AllSubtitle;
