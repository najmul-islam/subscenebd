import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const Themeprovider = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);
  // https://www.color-hex.com/color-palette/6837
  // black #1a1a1a font color
  // red #dd2826
  // white #ffffff background color
  // #f1f1f1
  // gray #8e8e8c

  // const lightColors = {
  //   primary: "#FF0000",
  //   secondary: "#606060",
  //   background: "#FFFFFF",
  //   text: "#3C3C3C",
  // };

  // const darkColors = {
  //   primary: "#FF0000",
  //   secondary: "#909090",
  //   background: "#1F1F1F",
  //   text: "#EFEFEF",
  // };
  const youtubeDark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#FF0000",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

  // YouTube light theme
  const youtubeLight = createTheme({
    palette: {
      mode: "light",
      // primary: {
      //   main: "#ffffff",
      // },
      // secondary: {
      //   main: "#8e8e8c",
      // },
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
    <ThemeProvider theme={mode === "dark" ? youtubeDark : youtubeLight}>
      {children}
    </ThemeProvider>
  );
};

export default Themeprovider;
