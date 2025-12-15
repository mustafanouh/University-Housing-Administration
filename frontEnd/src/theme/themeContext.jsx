// theme/themeContext.js
import { createContext, useContext, useState, useMemo } from "react";
import { lightColors, darkColors } from "./themeBase";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProviderContext = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [primaryColor, setPrimaryColor] = useState(lightColors.primary);
  const [language, setLanguage] = useState("en");

  const colors = mode === "dark" ? darkColors : lightColors;

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");
  const changeColor = (newColor) => setPrimaryColor(newColor);

  const value = useMemo(() => ({
    mode,
    toggleMode,
    colors,
    primaryColor,
    changeColor,
    language,
    setLanguage,
  }), [mode, primaryColor, language, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
