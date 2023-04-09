import React, { useState } from "react";
import HeaderListItem from "./HeaderListItem";
import { Menu, IconButton, Typography, Divider, Tooltip } from "@mui/material";

import {
  PostAddOutlined,
  MovieOutlined,
  SmartDisplayOutlined,
  MovieFilterOutlined,
  MusicVideoOutlined,
} from "@mui/icons-material";

const Uploads = () => {
  const [anchorElCreate, setAnchorElCreate] = useState(null);

  const open = Boolean(anchorElCreate);

  const handleOpenCreateMenu = (event) => {
    setAnchorElCreate(event.currentTarget);
  };

  const handleCloseCreateMenu = () => {
    setAnchorElCreate(null);
  };

  return (
    <>
      <Tooltip title="Add Subtitle">
        <IconButton onClick={handleOpenCreateMenu}>
          <PostAddOutlined sx={{ fontSize: "25px", color: "white" }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElCreate}
        keepMounted
        open={open}
        onClose={handleCloseCreateMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: "220px",
          },
        }}
      >
        <Typography variant="h6" sx={{ px: 2, py: 1 }}>
          Uploads
        </Typography>

        <Divider />
        <HeaderListItem
          link="/upload/movie/search"
          icon={<MovieOutlined />}
          text="Movie"
        />
        <HeaderListItem
          link="/upload/series"
          icon={<SmartDisplayOutlined />}
          text="TV-Series"
        />
        <HeaderListItem
          link="/upload/short-film"
          icon={<MovieFilterOutlined />}
          text="Short Films"
        />
        <HeaderListItem
          link="/upload/music"
          icon={<MusicVideoOutlined />}
          text="Music Videos"
        />
      </Menu>
    </>
  );
};

export default Uploads;
