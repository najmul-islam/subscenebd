import {
  LightModeOutlined,
  NightlightRoundOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../../features/theme/themeSlice";

const ThemeButton = () => {
  const { mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const handleColor = () => {
    dispatch(toggleColor(mode));
  };

  return (
    <IconButton
      sx={{ color: (theme) => theme.palette.text.primary }}
      onClick={handleColor}
    >
      {mode === "dark" ? (
        <LightModeOutlined />
      ) : (
        <NightlightRoundOutlined color="#000000" />
      )}
    </IconButton>
  );
};

export default ThemeButton;
