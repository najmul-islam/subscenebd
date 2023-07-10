import SidebarListItem from "./SidebarListItem";
import {
  List,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Box,
} from "@mui/material";

import {
  AccessTimeOutlined,
  BarChartOutlined,
  VideoLibraryOutlined,
  MovieOutlined,
  SmartDisplayOutlined,
  MovieFilterOutlined,
  MusicVideoOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SidebarList = () => {
  const [list, setList] = useState("latest");
  const navigate = useNavigate();
  const handleList = (e, newList) => {
    setList(newList);
  };
  return (
    <>
      <List>
        <SidebarListItem
          link="/latest"
          icon={<AccessTimeOutlined />}
          text="Latest"
        />
        <SidebarListItem
          link="/popular"
          icon={<BarChartOutlined />}
          text="Popular"
        />
      </List>
      <Divider />
      <List sx={{ paddingTop: "1px" }}>
        {/* <Box sx={{ display: "flex" }}>
          <SidebarListItem
            link="/latest"
            icon={<AccessTimeOutlined />}
            text="Latest"
          />
          <SidebarListItem
            link="/popular"
            icon={<BarChartOutlined />}
            text="Popular"
          />
        </Box> */}
        {/* <ToggleButtonGroup
          color="primary"
          exclusive
          fullWidth={true}
          value={list}
          onChange={handleList}
        >
          <ToggleButton
            value="latest"
            aria-label="latest"
            selected={list === "latest" ? true : false}
            sx={{ border: "0", borderRadius: "0" }}
            onClick={() => navigate("/latest")}
          >
            <AccessTimeOutlined sx={{ mr: "10px" }} /> Latest
          </ToggleButton>
          <ToggleButton
            value="popular"
            aria-label="popular"
            selected={list === "popular" ? true : false}
            sx={{ border: "0", borderRadius: "0" }}
            onClick={() => navigate("/popular")}
          >
            <BarChartOutlined sx={{ mr: "10px" }} /> Popular
          </ToggleButton>
        </ToggleButtonGroup> */}
        {/* <Divider /> */}
        {/* {list === "latest" ? (
          <Box>
            <SidebarListItem
              link="all"
              icon={<VideoLibraryOutlined />}
              text="All"
            />
            <SidebarListItem
              link="movies"
              icon={<MovieOutlined />}
              text="Movies"
            />
            <SidebarListItem
              link="series"
              icon={<SmartDisplayOutlined />}
              text="TV-Series"
            />
            <SidebarListItem
              link="short-films"
              icon={<MovieFilterOutlined />}
              text="Short Films"
            />
            <SidebarListItem
              link="musics"
              icon={<MusicVideoOutlined />}
              text="Music Videos"
            />
          </Box>
        ) : (
          <Box>
            <SidebarListItem
              link="/all"
              icon={<VideoLibraryOutlined />}
              text="All"
            />
            <SidebarListItem
              link="/movies"
              icon={<MovieOutlined />}
              text="Movies"
            />
            <SidebarListItem
              link="/series"
              icon={<SmartDisplayOutlined />}
              text="TV-Series"
            />
            <SidebarListItem
              link="/short-films"
              icon={<MovieFilterOutlined />}
              text="Short Films"
            />
            <SidebarListItem
              link="/musics"
              icon={<MusicVideoOutlined />}
              text="Music Videos"
            />
          </Box>
        )} */}
        <Box>
          <SidebarListItem
            link="all"
            icon={<VideoLibraryOutlined />}
            text="All"
          />
          <SidebarListItem
            link="movies"
            icon={<MovieOutlined />}
            text="Movies"
          />
          <SidebarListItem
            link="series"
            icon={<SmartDisplayOutlined />}
            text="TV-Series"
          />
          <SidebarListItem
            link="short-films"
            icon={<MovieFilterOutlined />}
            text="Short Films"
          />
          <SidebarListItem
            link="musics"
            icon={<MusicVideoOutlined />}
            text="Music Videos"
          />
        </Box>
      </List>
    </>
  );
};

export default SidebarList;
