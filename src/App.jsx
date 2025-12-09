import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import { ThemeProviderContext } from "./theme/themeContext.jsx";
import CustomThemeProvider from "./theme/themeProvider.jsx";

import { NavigateContext } from "./context/navigateContext.jsx";



function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const noLayoutPaths = ["/login", "/register", "/logout"];
  const showLayout = !noLayoutPaths.includes(location.pathname);


  return (
    <ThemeProviderContext>
      <CustomThemeProvider>
        <NavigateContext.Provider value={navigate}>
          <DashboardLayout>
            <AppRoutes />
          </DashboardLayout>
        </NavigateContext.Provider>

        {/* {showLayout ? (
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      ) : (
        <AppRoutes />
      )} */}

      </CustomThemeProvider>
    </ThemeProviderContext>
  );
}

export default App;
