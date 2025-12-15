
import {
    Box,
    Card,
    Typography,
    Avatar,
    Stack,
    Divider,
    TextField,
    Button,
    IconButton,
    Tooltip,
    Paper,
    Grid,
    Link,
  
} from "@mui/material";
import {
    PhoneOutlined,
    EmailOutlined,
    LocationOnOutlined,
    Facebook,
    Twitter,
    LinkedIn,
    Instagram,
    WhatsApp,
    SupportAgent,
} from "@mui/icons-material";

import { useState } from "react";

export default function Contact() {


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has been sent successfully! Thank you for contacting us.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: { xs: 2, sm: 4 },
       
            }}
        >
            <Card
                sx={{
                    maxWidth: 1100,
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                    bgcolor: "background.paper",
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        background: "linear-gradient(45deg, #2f973b, #044d23)",
                        color: "white",
                        p: { xs: 4, md: 6 },
                        textAlign: "center",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 100,
                            height: 100,
                            mx: "auto",
                            mb: 3,
                            bgcolor: "rgba(255,255,255,0.25)",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                        }}
                    >
                        <SupportAgent sx={{ fontSize: 50 }} />
                    </Avatar>
                    <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
                        Contact Us
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                        We are here to help you anytime
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ p: { xs: 3, md: 5 }, justifyContent: "space-evenly" }}>
                    {/* Contact Info Section - Left Side */}
                    <Grid size={{ xs: 12, md: 5 }}  >
                        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                            Contact Information
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Stack spacing={3}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 8 } }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar sx={{ bgcolor: "success.main", color: "white" }}>
                                        <PhoneOutlined />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="medium">Phone Number</Typography>
                                        <Typography variant="body1" color="text.secondary">+966 50 123 4567</Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 8 } }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar sx={{ bgcolor: "error.main", color: "white" }}>
                                        <EmailOutlined />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="medium">Email Address</Typography>
                                        <Link href="mailto:support@housingpayment.com" color="inherit" underline="none">
                                            <Typography variant="body1">support@housingpayment.com</Typography>
                                        </Link>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, transition: "0.3s", "&:hover": { transform: "translateY(-5px)", boxShadow: 8 } }}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar sx={{ bgcolor: "warning.main", color: "white" }}>
                                        <LocationOnOutlined />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" fontWeight="medium">Address</Typography>
                                        <Typography variant="body1" color="text.secondary">
                                        Syria, Aleppo - University Housing Administration
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            {/* Social Media */}
                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h6" fontWeight="bold" gutterBottom color="primary">
                                    Follow Us on Social Media
                                </Typography>
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Tooltip title="Facebook">
                                        <IconButton size="large" sx={{ bgcolor: "#1877F2", color: "white", "&:hover": { bgcolor: "#166fe5" } }}>
                                            <Facebook />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Twitter">
                                        <IconButton size="large" sx={{ bgcolor: "#1DA1F2", color: "white", "&:hover": { bgcolor: "#0d8bd9" } }}>
                                            <Twitter />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="LinkedIn">
                                        <IconButton size="large" sx={{ bgcolor: "#0A66C2", color: "white", "&:hover": { bgcolor: "#095bb5" } }}>
                                            <LinkedIn />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Instagram">
                                        <IconButton size="large" sx={{ bgcolor: "#E4405F", color: "white", "&:hover": { bgcolor: "#d62e52" } }}>
                                            <Instagram />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="WhatsApp">
                                        <IconButton size="large" sx={{ bgcolor: "#25D366", color: "white", "&:hover": { bgcolor: "#1ebe57" } }}>
                                            <WhatsApp />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>

                    {/* Contact Form Section - Right Side */}
                    <Grid  size={{ xs: 12, md: 6 }} sx={{ width: { xs: "100%", md: "50%" } }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                            Send Us a Message
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <TextField

                                fullWidth
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ bgcolor: "background.default" }}
                            />
                            <TextField

                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ bgcolor: "background.default" }}
                            />
                            <TextField

                                fullWidth
                                label="Subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ bgcolor: "background.default" }}
                            />
                            <TextField

                                fullWidth
                                label="Your Message"
                                name="message"
                                multiline
                                rows={6}
                                value={formData.message}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ bgcolor: "background.default" }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 2,
                                    borderRadius: 3,
                                    bgcolor: "success.main",
                                    "&:hover": { bgcolor: "success.dark" },
                                    fontSize: "1.1rem",
                                }}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}