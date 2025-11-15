import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useLocation } from "react-router-dom";
import theme from "./theme";
import AppRoutes from "./routes.jsx";
import DashboardLayout from "./component/DashboardLayout.jsx";

function App() {
  const location = useLocation();

  const noLayoutPaths = ["/login", "/register", "/logout"];
  const showLayout = !noLayoutPaths.includes(location.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      

       <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>

      {/* {showLayout ? (
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      ) : (
        <AppRoutes />
      )} */}

    </ThemeProvider>
  );
}

export default App;
