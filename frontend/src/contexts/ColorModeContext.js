import { useState, useEffect, useContext, createContext, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  //     },
  //   }),
  //   []
  // );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const setColor = (mode) => {
    window.localStorage.setItem("color", mode);
    setMode(mode);
  };

  const toggleColor = () => {
    return mode === "light" ? setColor("dark") : setColor("light");
  };

  useEffect(() => {
    const localColor = window.localStorage.getItem("color");
    localColor ? setColor(localColor) : setColor(mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColor }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// export const use = () => {
//   return useContext(ColorModeContext);
// };
