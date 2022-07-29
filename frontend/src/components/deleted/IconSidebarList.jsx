import SidebarListItem from "./IconSidebarListItem";
import { List, Divider } from "@mui/material";

import {
  AccessTimeOutlined,
  BarChartOutlined,
  VideoLibraryOutlined,
  MovieOutlined,
  SmartDisplayOutlined,
  MovieFilterOutlined,
  MusicVideoOutlined,
} from "@mui/icons-material";

const IconSidebarList = () => {
  return (
    <>
      <List aria-label="main mailbox folders" sx={{ paddingTop: "1px" }}>
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
        <Divider />
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
      </List>
    </>
  );
};

export default IconSidebarList;
