import createTheme from "@mui/material/styles/createTheme";

// A custom theme for this app
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      secondary: "#fff",
    },
    primary: {
      main: "#007AFF",
    },
  },
});
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007AFF",
    },
    text: {
      primary: "#fff",
      secondary: "#000",
    },
  },
});
