import React from "react";
import { IconButton } from "@mui/material";
import {
  NightlightRoundOutlined,
  LightModeOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../../features/theme/themeSlice";

const ToggleColorButton = () => {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const handleColor = () => {
    dispatch(toggleColor(mode));
  };

  return (
    <IconButton
      sx={{ minWidth: "35px", marginLeft: "20px" }}
      onClick={handleColor}
    >
      {mode === "dark" ? <LightModeOutlined /> : <NightlightRoundOutlined />}
    </IconButton>
  );
};

export default ToggleColorButton;
