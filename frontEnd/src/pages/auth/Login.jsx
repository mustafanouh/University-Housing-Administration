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
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const {
    mutate: loginMutation,  // هنا بنستخرج الدالة ونسميها زي ما نحب
    isPending,                 // للـ loading
    isError,
    error,
    data,                      // الـ response (فيه token و user)
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

            {/* رابط نسيت كلمة المرور + زر التسجيل في نفس الصف */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
              <Grid >
                <Button
                  variant="text"
                  onClick={handleRegisterClick}
                  sx={{
                    textTransform: "none",
                    fontWeight: "medium",
                  }}
                >
                 Your do not have account ,Sign Up now?
                </Button>
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
            {isPending ? "Loading ... " : "Sign in"}
            </Button>



            {isSuccess && data && (
              <Alert severity="success" sx={{ mt: 3 }}>
                تم التسجيل بنجاح! جاري توجيهك...
                {/* الـ setAuth هيخزن الـ token تلقائيًا من الـ onSuccess */}
              </Alert>
            )}

            {isError && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error?.message || "حدث خطأ أثناء التسجيل. حاول مرة أخرى."}
              </Alert>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}