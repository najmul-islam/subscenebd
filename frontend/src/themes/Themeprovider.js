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

  // const darkColors = {
  //   primary: "#FF0000",
  //   secondary: "#909090",
  //   background: "#1F1F1F",
  //   text: "#EFEFEF",
  // };
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#ff0000",
        light: "#ff9999",
        dark: "#990000",
        contrastText: "#ffffff",
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
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#ffffff",
        light: "#f7f7f7",
        dark: "#dcdcdc",
        contrastText: "#3C3C3C",
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
