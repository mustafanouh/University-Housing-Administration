import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff0000" },
    secondary: { main: "#edf2ff" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#fff", secondary: "#bdbdbd" },
  },
});

export default theme;
