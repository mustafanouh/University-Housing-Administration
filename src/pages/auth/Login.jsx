import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";


// **Material-UI Components**
import { Box, TextField, Button, Typography, Paper, Alert } from "@mui/material";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const token = cookies.token;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", form);
      setCookie("token", res.data.token, {
        path: "/",
        maxAge: 3600,
        secure: true,
      });
      setError("");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
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
      <Paper sx={{ p: 4, width: 350 }} elevation={6}>
        <Typography variant="h5" align="center" mb={3}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>

          {token && (
            <Alert severity="success" sx={{ mt: 1, wordBreak: "break-all" }}>
              Token: {token}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
