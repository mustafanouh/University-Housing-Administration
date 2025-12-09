

import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {
  Box,
  Card,
  Typography,
  Avatar,
  Stack,
  Divider,
  Chip,
  Paper,
} from "@mui/material";

import { useState } from 'react';

export default function Notifications() {
  const [selectedCard, setSelectedCard] = useState(null);

  const notifications = [
    { index :0 ,From: "Admin", Message: "This is the first notification.", Data: "2024-01-01" },
    {index :1, From:  "supervisor", Message: "This is the second notification.", Data: "2024-02-01" },
    {index :2 , From: "manger", Message: "This is the third notification.", Data: "2024-03-01" },
    { index :3 ,From: "supervisor", Message: "This is the second notification.", Data: "2024-02-01" },
    { index :4 ,From: "manger", Message: "This is the third notification.", Data: "2024-03-01" },
    { index :5 ,From: "IT", Message: "This is the third notification.", Data: "2024-03-01" },
  ];

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
          width: "100%",
          maxWidth: 800,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
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
            p: 5,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 3,
              bgcolor: "rgba(255,255,255,0.25)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 48 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
         Notifications
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.9 }}>
            Notifications Center
          </Typography>
        </Box>

        {/* Notifications List */}
        <Stack spacing={2} sx={{ p: 3 }}>
          {notifications.map((notif, index) => (
            <Paper
              key={notif.index}
              elevation={selectedCard === index ? 8 : 3}
              onClick={() => setSelectedCard(selectedCard === index ? null : index)}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s ease",
                cursor: "pointer",
                bgcolor: selectedCard === index ? "action.selected" : "background.default",
                "&:hover": {
                  elevation: 6,
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardActionArea sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: 48,
                      height: 48,
                    }}
                  >
                    {notif.From.charAt(1).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{fontWeight:'bold'}} fontWeight="medium">
                      {notif.From.toUpperCase()}
                    </Typography>
                    <Typography variant="body1" color="text.primary" sx={{ mt: 0.5 }}>
                      {notif.Message}
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5 }}>
                      <Chip
                        label={notif.Data}
                        size="small"
                        color="default"
                        sx={{ bgcolor: "grey.200" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Received
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardActionArea>
              {selectedCard === index && (
                <Divider />
              )}
            </Paper>
          ))}
        </Stack>
      </Card>
    </Box>
  );
}