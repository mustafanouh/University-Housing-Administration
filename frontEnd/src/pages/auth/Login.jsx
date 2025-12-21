import React, { useState } from "react";

import { useNavigateContext } from "../../context/navigateContext";
import { useLogin } from "../../features/auth/auth.queries";
// **Material-UI Components**
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Avatar,
  IconButton,
  InputAdornment,
  Link,
  Grid,
  useTheme,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
// إضافة أيقونة Google (من Material Icons)
import GoogleIcon from "@mui/icons-material/Google";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // إذا أردت تتبع الحالة

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
    data,
    isSuccess
  } = useLogin();

  const theme = useTheme();
  const navigate = useNavigateContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(form);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleGoogleSignIn = () => {
    // هنا يمكنك إضافة منطق تسجيل الدخول عبر Google لاحقًا
    console.log("Sign in with Google clicked");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.secondary.main}22 100%), ${theme.palette.background.default}`,
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, sm: 5 },
          width: { xs: "100%", sm: 420 },
          maxWidth: 420,
          borderRadius: 4,
          bgcolor: "background.paper",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              width: 56,
              height: 56,
            }}
          >
            <LockOutlined fontSize="large" />
          </Avatar>

          <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
            Sign In
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Welcome back! Please enter your details to continue.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Remember me + Forgot password */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <Grid >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "primary.main" }}> {/* غيّر اللون هنا */}
                      Remember me
                    </Typography>
                  }
                />
              </Grid>
              <Grid >
                <Link href="#" variant="body2" underline="hover">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                "&:hover": {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                },
              }}
            >
              {isPending ? "Loading..." : "Sign in"}
            </Button>

            <Button
              variant="text"
              onClick={handleRegisterClick}
              sx={{
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              No account? Sign Up now
            </Button>

            {/* Sign in with Google Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "medium",
                borderColor: "#dadce0",
                color: "#3c4043",
                bgcolor: "#ffffff",
                "&:hover": {
                  bgcolor: "#f8f9fa",
                  borderColor: "#dadce0",
                },
              }}
            >
              Sign in with Google
            </Button>

            {isSuccess && data && (
              <Alert severity="success" sx={{ mt: 3 }}>
                Login successful! Redirecting...
              </Alert>
            )}

            {isError && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error?.message || "An error occurred during login. Please try again."}
              </Alert>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}