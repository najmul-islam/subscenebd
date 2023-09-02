import React from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Themeprovider = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);

  // https://www.color-hex.com/color-palette/6837
  // black #1a1a1a font color
  // red #dd2826
  // white #ffffff background color
  // #f1f1f1
  // gray #8e8e8c

  // const darkColors = {
  //   primary: "#FF0000",
  //   secondary: "#909090",
  //   background: "#1F1F1F",#0F0F0F
  //   text: "#EFEFEF", background: "palette.background.default",
  // };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0F0F0F",
        paper: "#0F0F0F",
        primary: "#0F0F0F",
        secondary: "#282828",
      },
      text: {
        primary: "#f1f1f1",
        secondary: "#aaaaaa",
      },
      action: {
        hover: "#272727",
      },
    },
  });

  // const lightColors = {
  //   primary: "#FF0000",
  //   secondary: "#606060",
  //   background: "#FFFFFF",
  //   text: "#3C3C3C",
  // };

  // YouTube light theme
  // #E5E5E5
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        paper: "#ffffff",
        primary: "#ffffff",
        secondary: "#E5E5E5",
      },
      text: {
        primary: "#0f0f0f",
        secondary: "#606060",
      },
      action: {
        hover: "#f2f2f2",
      },
    },
  });

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //         primary: {
  //           main: "#ffffff",
  //         },
  //       },
  //     }),
  //   [mode]
  // );

  // useEffect(() => {
  //   const localColor = window.localStorage.getItem("color");
  //   localColor ? setColor(localColor) : setColor(mode);
  // }, [mode]);

  return (
    <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Themeprovider;
