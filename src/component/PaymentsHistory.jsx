import React from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Chip,
  Avatar,
  Paper,
 
} from "@mui/material";
import {
  CreditCard,
  AccountBalance,
  AccountBalanceWallet,
  ReceiptLong,
  CalendarToday,
  AttachMoney,
} from "@mui/icons-material";

export default function PaymentsHistory() {
  const history = [
    { id: 1, amount: 150, date: "2025-01-12", method: "Card" },
    { id: 2, amount: 150, date: "2024-10-03", method: "Transfer" },
    { id: 3, amount: 150, date: "2024-06-20", method: "Cash" },
  ];

  const getMethodConfig = (method) => {
    switch (method) {
      case "Card":
        return { icon: <CreditCard />, color: "#1976d2", label: "Card" };
      case "Transfer":
        return { icon: <AccountBalance />, color: "#7b1fa2", label: "Bank Transfer" };
      case "Cash":
        return { icon: <AccountBalanceWallet />, color: "#388e3c", label: "Cash" };
      default:
        return { icon: <ReceiptLong />, color: "#666", label: "Unknown" };
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius:3,
        p: { xs: 2, sm: 3 },
      }}
    >
      <Card
        sx={{
          maxWidth: 640,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          bgcolor: "background.paper",
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
            <ReceiptLong sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Payments History
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
            {history.length} completed payment{history.length !== 1 ? "s" : ""}
          </Typography>
        </Box>

        <Box sx={{ p: { xs: 3, sm: 5 } }}>
          {history.length === 0 ? (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "grey.100",
                color: "text.secondary",
              }}
            >
              <ReceiptLong sx={{ fontSize: 60, opacity: 0.4, mb: 2 }} />
              <Typography variant="h6">No payments yet</Typography>
              <Typography variant="body2">
                Your payment history will appear here once you make a payment.
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={3}>
              {history.map((payment) => {
                const config = getMethodConfig(payment.method);
                return (
                  <Paper
                    key={payment.id}
                    elevation={2}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      borderLeft: `6px solid ${config.color}`,
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", sm: "center" }}
                      spacing={2}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: config.color,
                            width: 56,
                            height: 56,
                          }}
                        >
                          {config.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold">
                            ${payment.amount}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {config.label}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                        <Chip
                          icon={<CalendarToday fontSize="small" />}
                          label={payment.date}
                          size="small"
                          sx={{
                            mb: 1,
                            bgcolor: "grey.100",
                            fontWeight: 500,
                          }}
                        />
                        <Typography
                          variant="body2"
                          color="success.main"
                          fontWeight="bold"
                          sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}
                        >
                          <AttachMoney fontSize="small" />
                          Paid
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </Box>
      </Card>
    </Box>
  );
}