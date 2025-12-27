import React from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  Grid,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useThemeContext } from "../theme/themeContext";
import { useAuthStore } from "../features/auth/auth.store";

export default function UserProfile() {
  const { colors } = useThemeContext();
  const { token, user, role } = useAuthStore(); // user contains newEmployee data

  // Combine full name
  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Header with avatar and name */}
        <Box
          sx={{
            background: "linear-gradient(45deg, #2f973b, #044d23)",
            color: "white",
            p: 4,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 140,
              height: 140,
              mx: "auto",
              mb: 2,
              fontSize: 60,
              fontWeight: "bold",
              border: "6px solid rgba(255,255,255,0.3)",
              bgcolor: "rgba(255,255,255,0.2)",
            }}
          >
            {fullName.charAt(0).toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            {fullName || "Not Specified"}
          </Typography>
          <Chip
            label={`Role: ${role || "Not Specified"}`}
            color="secondary"
            sx={{ mt: 1.5, height: 36, fontSize: "1rem", fontWeight: "bold" }}
          />
        </Box>

        {/* Card body - display data */}
        <Box sx={{ p: { xs: 3, sm: 5 } }}>
          <Grid container spacing={4}>
            {/* Left column */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3.5}>
                <InfoRow label="First Name" value={user?.first_name} />
                <InfoRow label="Last Name" value={user?.last_name} />
                <InfoRow label="Age" value={user?.age} />
                <InfoRow label="Specialization" value={user?.specialization} />
              </Stack>
            </Grid>

            {/* Right column */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={3.5}>
                <InfoRow label="ID Number" value={user?.id} />
                <InfoRow label="Mobile Number" value={user?.mobile} />
                <InfoRow label="Email" value={user?.email} />
                <InfoRow label="Unit ID" value={user?.unit_id} />
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 5 }} />

          {/* Edit button */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 2, fontWeight: 500 }}
            >
              Want to update your information?
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.5,
                bgcolor: "primary.main",
                color: "white",
                px: 4,
                py: 2,
                borderRadius: 3,
                cursor: "pointer",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "primary.dark",
                  transform: "translateY(-2px)",
                },
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
              }}
              onClick={() => {
                alert("Edit profile feature will be added soon");
              }}
            >
              <EditIcon />
              <Typography fontWeight="bold">Edit Profile</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

// Component to display a single info row
function InfoRow({ label, value }) {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}
      >
        {label}
      </Typography>
      <Typography variant="h6" fontWeight="bold" sx={{ color: "#2d3748" }}>
        {value || "Not Available"}
      </Typography>
    </Box>
  );
}