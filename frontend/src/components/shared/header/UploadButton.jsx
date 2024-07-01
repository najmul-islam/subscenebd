import { Divider, IconButton, Menu, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import HeaderListItem from "./HeaderListItem";

import {
  MovieFilterOutlined,
  // PostAddOutlined,
  MovieOutlined,
  MusicVideoOutlined,
  SmartDisplayOutlined,
} from "@mui/icons-material";
import { VscDiffAdded } from "react-icons/vsc";
const UploadButton = () => {
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
        <IconButton
          onClick={handleOpenCreateMenu}
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          <VscDiffAdded style={{ fontSize: "23px" }} />
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
        <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
          Uploads
        </Typography>

        <Divider />
        <HeaderListItem
          link="/upload/movie"
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

export default UploadButton;
