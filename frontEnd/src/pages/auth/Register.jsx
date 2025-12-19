import React, { useState } from "react";
import { useRegister } from "../../features/auth/auth.queries";
import { useNavigate } from "react-router-dom";

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
  Grid, // هذا الآن Grid v2 في MUI v6+ (لا يحتاج item أو xs/sm مباشرة)
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAddOutlined } from "@mui/icons-material";

export default function Register() {

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    country: "",
    mobile: "",
    email: "",
    password: "",
    specialization: "",
    age: "",
    unit_id: "",
  });


  const {
    mutate: registerMutation,  // هنا بنستخرج الدالة ونسميها زي ما نحب
    isPending,                 // للـ loading
    isError,
    error,
    data,                      // الـ response (فيه token و user)
    isSuccess
  } = useRegister();



  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  // للتحكم في التجاوب
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation(form);

  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}22 0%, ${theme.palette.secondary.main}22 100%), ${theme.palette.background.default}`,
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: '#639147'
      }}

    >
      <Paper
        elevation={12}
        sx={{
          p: { xs: 3, sm: 4, md: 5 },
          width: "100%",
          maxWidth: { xs: 380, sm: 480, md: 550 },
          borderRadius: { xs: 3, sm: 4 },
          bgcolor: "background.paper",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
            }}
          >
            <PersonAddOutlined fontSize={isMobile ? "medium" : "large"} />
          </Avatar>

          <Typography
            component="h1"
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            gutterBottom
            textAlign="center"
          >
            Sign Up
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={3}
            textAlign="center"
            px={2}
          >
            Create your account to get started
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <Grid container spacing={isMobile ? 1.5 : 2}>
              {/* تم إزالة item و xs/sm - الآن size={{ xs: 12, sm: 6 }} للـ responsive */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  autoFocus={!isMobile}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="City / Country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="e.g., Aleppo"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  type="tel"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="age"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  type="number"
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Specialization"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="unit id"
                  name="unit_id"
                  value={form.unit_id}
                  onChange={handleChange}
               
              
                  size={isMobile ? "small" : "medium"}
                >
        
                </TextField>
              </Grid>

              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end" size={isMobile ? "small" : "medium"}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: { xs: 2.5, sm: 3 },
                mb: 2,
                py: { xs: 1.4, sm: 1.6 },
                borderRadius: 3,
                textTransform: "none",
                fontSize: { xs: "1rem", sm: "1.1rem" },
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                "&:hover": {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isPending ? "Loading ... " : "Sign Up"}
            </Button>

            <Grid container justifyContent="center">
              <Grid>
                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "medium",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
                >
                  Already have an account? Sign In
                </Button>
              </Grid>
            </Grid>


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