import { darkTheme, lightTheme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext<{
  mode: "light" | "dark";
  handleSetTheme: (newMode: "light" | "dark") => void;
}>({
  mode: "light",
  handleSetTheme: (newMode) => {
    return newMode;
  },
});

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const themeMap = {
    light: lightTheme,
    dark: darkTheme,
  };
  function handleSetTheme(newMode: "light" | "dark") {
    setMode(newMode);
    localStorage.setItem("chatAppTheme", newMode);
  }
  useEffect(() => {
    const localMode = localStorage.getItem("chatAppTheme");
    if (localMode) {
      setMode(localMode as "light" | "dark");
    } else {
      setMode("light");
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ mode, handleSetTheme }}>
      <ThemeProvider theme={themeMap[mode]}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
