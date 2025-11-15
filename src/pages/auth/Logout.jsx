import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Box, Paper, Typography, Button } from "@mui/material";

export default function Logout() {
  const [cookies, , removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          تسجيل الخروج
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          هل ترغب بتسجيل الخروج الآن؟
        </Typography>

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Paper>
    </Box>
  );
}
