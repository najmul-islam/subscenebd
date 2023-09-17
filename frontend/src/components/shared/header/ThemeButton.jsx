import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../../features/theme/themeSlice";
import { IconButton } from "@mui/material";
import {
  NightlightRoundOutlined,
  LightModeOutlined,
} from "@mui/icons-material";

const ThemeButton = () => {
  const { mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  const handleColor = () => {
    dispatch(toggleColor(mode));
  };

  return (
    <IconButton sx={{}} onClick={handleColor}>
      {mode === "dark" ? (
        <LightModeOutlined />
      ) : (
        <NightlightRoundOutlined color="#000000" />
      )}
    </IconButton>
  );
};

export default ThemeButton;
