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
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAddOutlined } from "@mui/icons-material";

export default function Register() {
  // Fields exactly matching Laravel validation rules
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",         
    mobile: "",
    email: "",
    password: "",
    specialization: "",
    age: "",
    unit_id: "",
  });

  // To display Laravel validation errors
  const [validationErrors, setValidationErrors] = useState({});

  const {
    mutate: registerMutation,
    isPending,
    isError,
    error,
    isSuccess,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error for this field as soon as user types
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: undefined });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({}); 

    registerMutation(form, {
      onError: (err) => {
        if (err.response?.status === 422) {
          setValidationErrors(err.response.data.errors || {});
        }
      },
      onSuccess: () => {
       
        setTimeout(() => navigate("/dashboard"), 1000);
      },
    });
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
        bgcolor: "#639147",
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

          <Typography component="h1" variant={isMobile ? "h5" : "h4"} fontWeight="bold" gutterBottom textAlign="center">
            Create New Account
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={3} textAlign="center" px={2}>
            Fill in your details to get started
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: "100%" }}>
            <Grid container spacing={isMobile ? 1.5 : 2}>
              {/* First & Last Name */}
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
                  error={!!validationErrors.first_name}
                  helperText={validationErrors.first_name?.[0]}
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
                  error={!!validationErrors.last_name}
                  helperText={validationErrors.last_name?.[0]}
                />
              </Grid>

              {/* Address */}
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Address (Optional)"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g., Damascus, Syria"
                  size={isMobile ? "small" : "medium"}
                  error={!!validationErrors.address}
                  helperText={validationErrors.address?.[0]}
                />
              </Grid>

              {/* Mobile & Email */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Mobile Number (Optional)"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  type="tel"
                  size={isMobile ? "small" : "medium"}
                  error={!!validationErrors.mobile}
                  helperText={validationErrors.mobile?.[0]}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email?.[0]}
                />
              </Grid>

              {/* Age & Specialization */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  type="number"
                  InputProps={{ inputProps: { min: 18 } }}
                  size={isMobile ? "small" : "medium"}
                  error={!!validationErrors.age}
                  helperText={validationErrors.age?.[0]}
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
                  error={!!validationErrors.specialization}
                  helperText={validationErrors.specialization?.[0]}
                />
              </Grid>

              {/* Unit ID */}
              <Grid size={12}>
                <TextField
                  required
                  fullWidth
                  label="Unit ID"
                  name="unit_id"
                  value={form.unit_id}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter a valid unit ID from the system"
                  size={isMobile ? "small" : "medium"}
                  error={!!validationErrors.unit_id}
                  helperText={validationErrors.unit_id?.[0] || "Make sure this ID exists in the units table"}
                />
              </Grid>

              {/* Password */}
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
                  error={!!validationErrors.password}
                  helperText={validationErrors.password?.[0] || "Must be at least 8 characters"}
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
              disabled={isPending}
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
              {isPending ? "Signing Up..." : "Sign Up"}
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

            {/* Success or General Error Messages */}
            {isSuccess && (
              <Alert severity="success" sx={{ mt: 3 }}>
                Account created successfully! Redirecting...
              </Alert>
            )}

            {isError && Object.keys(validationErrors).length === 0 && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error?.message || "An error occurred during registration. Please try again."}
              </Alert>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}