import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import { ThemeProviderContext } from "./theme/themeContext.jsx";
import CustomThemeProvider from "./theme/themeProvider.jsx";

import { NavigateContext } from "./context/navigateContext.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";



function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const noLayoutPaths = ["/login", "/register"];
  const showLayout = !noLayoutPaths.includes(location.pathname);


  return (
    <ThemeProviderContext>
      <CustomThemeProvider>

        <NavigateContext.Provider value={navigate}>
          {showLayout ? (
            <DashboardLayout>
              <AppRoutes />
            </DashboardLayout>
          ) : (
            <AppRoutes />
          )}
        </NavigateContext.Provider>



      </CustomThemeProvider>
    </ThemeProviderContext>
  );
}

export default App;
