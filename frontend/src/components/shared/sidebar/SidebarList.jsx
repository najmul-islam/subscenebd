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
        />
        <SidebarListItem
          link="/popular/all"
          icon={<BarChartOutlined />}
          text="Popular"
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
              // onClick={() => setList("latest")}
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
      </List>
    </>
  );
};

export default SidebarList;
