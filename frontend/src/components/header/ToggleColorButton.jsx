import React from "react";
import useColorMode from "../../hooks/ColorModeHook";
import { IconButton } from "@mui/material";
import {
  NightlightRoundOutlined,
  LightModeOutlined,
} from "@mui/icons-material";

const ToggleColorButton = () => {
  const { mode, toggleColor } = useColorMode();
  return (
    <IconButton
      sx={{ minWidth: "35px", marginLeft: "20px" }}
      onClick={toggleColor}
    >
      {mode === "dark" ? <LightModeOutlined /> : <NightlightRoundOutlined />}
    </IconButton>
  );
};

export default ToggleColorButton;
