import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [error, setError] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const token = cookies.token;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", form);

      setCookie("token", res.data.token, {
        path: "/",
        maxAge: 3600, 
        secure: true,
      });

      setError("");
    } catch (err) {
      setError("Registration failed. Please try again.");
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
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }} elevation={6}>
        <Typography variant="h5" align="center" mb={3}>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label=" Enter Your Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
         
            fullWidth
          />

          <TextField
            label="Enter Your Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
           
            fullWidth
          />

          <TextField
            label="Enter Your Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
       
            fullWidth
          />
          <TextField
            label="Confirm Your Password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            type="password"
            required
          
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
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
