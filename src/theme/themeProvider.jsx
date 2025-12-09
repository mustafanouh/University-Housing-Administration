
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useThemeContext } from "./themeContext";

const CustomThemeProvider = ({ children }) => {
  const { mode, colors, primaryColor } = useThemeContext();

  const Theme = createTheme({
    palette: {
      mode,
      primary: { main: primaryColor },
      secondary: { main: colors.secondary },
      error: { main: colors.error },
      success: { main: colors.success },
      warning: { main: colors.warning },
      info: { main: colors.info },
      background: colors.background,
      text: colors.text,
      notifications: {main:colors.notifications },
      iconPrimary:colors.iconPrimary,
    },
  });

  return <ThemeProvider theme={Theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
