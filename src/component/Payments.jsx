import React, { useState } from "react";
import { useNavigateContext } from "../context/navigateContext"; // استخدم Context اللي عملناه
import {
    Box,
    Card,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Avatar,
    Chip,
    Divider,
    Fade,
} from "@mui/material";
import {
    CreditCard,
    AccountBalanceWallet,
    AccountBalance,
    ReceiptLong,
    ArrowForward,
    Payment,
} from "@mui/icons-material";

export default function Payments() {
    const navigate = useNavigateContext();
    const [method, setMethod] = useState("");
    const [cardNumber, setCardNumber] = useState("");

    const fixedAmount = 150;

    const paymentMethods = [
        { value: "Card", label: "Credit / Debit Card", icon: <CreditCard /> },
        { value: "Cash", label: "Cash Payment", icon: <AccountBalanceWallet /> },
        { value: "Transfer", label: "Bank Transfer", icon: <AccountBalance /> },
    ];

    const handleSubmit = () => {
        //    ss
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "grey.50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                p: { xs: 2, sm: 3 },
            }}
        >
            <Card
                sx={{
                    maxWidth: 520,
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
                        <Payment sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold">
                        Housing Payment
                    </Typography>
                    <Chip
                        label={`$${fixedAmount} USD`}
                        color="secondary"
                        sx={{
                            mt: 2,
                            height: 48,
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            bgcolor: "rgba(255,255,255,0.25)",
                        }}
                    />
                </Box>

                <Box sx={{ p: { xs: 3, sm: 5 } }}>
                    <Stack spacing={4}>

                        {/* Payment Method Selection */}
                        <Box>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Select Payment Method
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={method}
                                    onChange={(e) => setMethod(e.target.value)}
                                    displayEmpty
                                    sx={{
                                        borderRadius: 3,
                                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "grey.300" },
                                    }}

                                >
                                    <MenuItem disabled value="">
                                        <em>Choose a method...</em>
                                    </MenuItem>
                                    {paymentMethods.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Avatar sx={{ bgcolor: "primary.light", width: 36, height: 36 }}>
                                                    {option.icon}
                                                </Avatar>
                                                <Typography>{option.label}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Divider />

                        {/* Card Number - Appears with smooth animation */}
                        <Fade in={method === "Card"} timeout={600}>
                            <Box>
                                {method === "Card" && (
                                    <TextField
                                        label="Card Number"
                                        placeholder="0000 0000 0000 0000"
                                        fullWidth
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(e.target.value)}
                                        InputProps={{
                                            startAdornment: <CreditCard sx={{ mr: 2, color: "text.secondary" }} />,
                                        }}
                                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                                    />
                                )}
                            </Box>
                        </Fade>

                        {/* Action Buttons */}
                        <Stack direction="row" justifyContent="space-between" spacing={2}>
                            <Button
                                variant="outlined"
                                startIcon={<ReceiptLong />}
                                onClick={() => navigate("/payments-history")}
                                sx={{
                                    flex: 1,
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: "bold",
                                    textTransform: "none",
                                }}
                            >
                                View History
                            </Button>

                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForward />}
                                onClick={handleSubmit}
                                disabled={!method}
                                sx={{
                                    flex: 2,
                                    py: 2,
                                    borderRadius: 3,
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    textTransform: "none",
                                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
                                    },
                                }}
                            >
                                Pay Now
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Card>
        </Box>
    );
}