import { useLocation } from "react-router-dom";
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

const SidebarList = () => {
  const { pathname } = useLocation();

  return (
    <>
      <List sx={{ display: "flex", padding: "0" }}>
        <SidebarListItem
          link="/latest/all"
          icon={<AccessTimeOutlined />}
          text="Latest"
          query="/latest/all"
        />
        <SidebarListItem
          link="/popular/all"
          icon={<BarChartOutlined />}
          text="Popular"
          query="/popular/all"
        />
      </List>
      <Divider />
      <List sx={{ paddingTop: "0" }}>
        {pathname.split("/")[1] === "latest" ? (
          <Box>
            <SidebarListItem
              link="/latest/all"
              icon={<VideoLibraryOutlined />}
              text="All"
              query="/latest/all"
              // onClick={() => setList("latest")}
            />
            <SidebarListItem
              link="/latest/movies"
              icon={<MovieOutlined />}
              text="Movies"
              query="/latest/movie"
            />
            <SidebarListItem
              link="/latest/series"
              icon={<SmartDisplayOutlined />}
              text="TV-Series"
              query="/latest/series"
            />
            <SidebarListItem
              link="/latest/short-films"
              icon={<MovieFilterOutlined />}
              text="Short Films"
              query="/latest/short-film"
            />
            <SidebarListItem
              link="/latest/musics"
              icon={<MusicVideoOutlined />}
              text="Music Videos"
              query="/latest/music"
            />
          </Box>
        ) : (
          <Box>
            <SidebarListItem
              link="/popular/all"
              icon={<VideoLibraryOutlined />}
              text="All"
              query="/popular/all"
            />
            <SidebarListItem
              link="/popular/movies"
              icon={<MovieOutlined />}
              text="Movies"
              query="/popular/movie"
            />
            <SidebarListItem
              link="/popular/series"
              icon={<SmartDisplayOutlined />}
              text="TV-Series"
              query="/popular/series"
            />
            <SidebarListItem
              link="/popular/short-films"
              icon={<MovieFilterOutlined />}
              text="Short Films"
              query="/popular/short-film"
            />
            <SidebarListItem
              link="/popular/musics"
              icon={<MusicVideoOutlined />}
              text="Music Videos"
              query="/popular/music"
            />
          </Box>
        )}
      </List>
    </>
  );
};

export default SidebarList;
