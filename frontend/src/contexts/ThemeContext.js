import { useState, useEffect, useContext, createContext } from "react";
import { ThemeProvieder as Theme } from "@mui/material";
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const setMode = (mode) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    return theme === "light" ? setMode("dark") : setMode("light");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme ? setTheme(localTheme) : setTheme("dark");
  }, []);

  return <ThemeContext value={{ toggleTheme }}>{children}</ThemeContext>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
