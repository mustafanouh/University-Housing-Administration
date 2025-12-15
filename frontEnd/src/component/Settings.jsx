import React from "react";
import {
  Box,
  Card,
  Typography,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Language,
  Palette,
  Translate,
} from "@mui/icons-material";
import { useThemeContext } from "../theme/themeContext";

export default function Settings() {
  const { mode, primaryColor, language, toggleMode, setLanguage } =
    useThemeContext();

  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          maxWidth: 1100,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          bgcolor: "background.paper",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
          },
        }}
      >
        {/* Header */}
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
              width: 80,
              height: 80,
              mx: "auto",
              mb: 2,
              bgcolor: "rgba(255,255,255,0.2)",
            }}
          >
            <Palette sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Settings
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Customize your experience
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={4.5}>

            {/* Dark Mode */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? "grey.900" : "grey.100",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: isDark ? "grey.800" : "grey.200" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {isDark ? <DarkMode /> : <LightMode />}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold" variant="h6">
                    Dark Mode
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {isDark ? "Currently enabled" : "Currently disabled"}
                  </Typography>
                </Box>
              </Box>
              <Switch
                checked={isDark}
                onChange={toggleMode}
                color="primary"
                size="large"
              />
            </Box>

            <Divider />

            {/* Language */}
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: isDark ? "grey.900" : "grey.100",
                transition: "all 0.3s ease",
                "&:hover": { bgcolor: isDark ? "grey.800" : "grey.200" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Language />
                </Avatar>
                <Typography fontWeight="bold" variant="h6">
                  Language
                </Typography>
              </Box>
              <FormControl fullWidth>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  sx={{
                    borderRadius: 2,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: isDark ? "grey.700" : "grey.300",
                    },
                  }}
                >
                  <MenuItem value="en">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Translate fontSize="small" /> English
                    </Box>
                  </MenuItem>
                  <MenuItem value="ar">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Translate fontSize="small" /> العربية
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}