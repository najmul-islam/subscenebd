import SidebarListItem from "./SidebarListItem";
import { List, Divider, Box } from "@mui/material";

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
import { useLocation, useMatch, useNavigate } from "react-router-dom";

const SidebarList = () => {
  const [list, setList] = useState("latest");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleList = (e, newList) => {
    setList(newList);
  };

  return (
    <>
      <List sx={{ display: "flex", padding: "0" }}>
        <SidebarListItem
          link="/latest/all"
          icon={<AccessTimeOutlined />}
          text="Latest"
        />
        <SidebarListItem
          link="/popular/all"
          icon={<BarChartOutlined />}
          text="Popular"
        />
      </List>
      <Divider />
      <List sx={{ paddingTop: "0" }}>
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

        {pathname.split("/")[1] === "latest" ? (
          <Box>
            <SidebarListItem
              link="/latest/all"
              icon={<VideoLibraryOutlined />}
              text="All"
              onClick={() => setList("latest")}
            />
            <SidebarListItem
              link="/latest/movies"
              icon={<MovieOutlined />}
              text="Movies"
            />
            <SidebarListItem
              link="/latest/series"
              icon={<SmartDisplayOutlined />}
              text="TV-Series"
            />
            <SidebarListItem
              link="/latest/short-films"
              icon={<MovieFilterOutlined />}
              text="Short Films"
            />
            <SidebarListItem
              link="/latest/musics"
              icon={<MusicVideoOutlined />}
              text="Music Videos"
            />
          </Box>
        ) : (
          <Box>
            <SidebarListItem
              link="/popular/all"
              icon={<VideoLibraryOutlined />}
              text="All"
            />
            <SidebarListItem
              link="/popular/movies"
              icon={<MovieOutlined />}
              text="Movies"
            />
            <SidebarListItem
              link="/popular/series"
              icon={<SmartDisplayOutlined />}
              text="TV-Series"
            />
            <SidebarListItem
              link="/popular/short-films"
              icon={<MovieFilterOutlined />}
              text="Short Films"
            />
            <SidebarListItem
              link="/popular/musics"
              icon={<MusicVideoOutlined />}
              text="Music Videos"
            />
          </Box>
        )}
        {/* <Box>
          <SidebarListItem
            link="/latest/all"
            icon={<VideoLibraryOutlined />}
            text="All"
          />
          <SidebarListItem
            link="/latest/movies"
            icon={<MovieOutlined />}
            text="Movies"
          />
          <SidebarListItem
            link="/latest/series"
            icon={<SmartDisplayOutlined />}
            text="TV-Series"
          />
          <SidebarListItem
            link="/latest/short-films"
            icon={<MovieFilterOutlined />}
            text="Short Films"
          />
          <SidebarListItem
            link="/latest/musics"
            icon={<MusicVideoOutlined />}
            text="Music Videos"
          />
        </Box> */}
      </List>
    </>
  );
};

export default SidebarList;
