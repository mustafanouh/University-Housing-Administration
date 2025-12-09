import React, { useState } from "react";
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    IconButton,
    Stack,
    Avatar,
    LinearProgress,
} from "@mui/material";
import {
    PhotoCamera,
    UploadFile,
    Construction,
    Send,
} from "@mui/icons-material";


export default function ConstructionRequest() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            alert("يرجى ملء العنوان والوصف");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) formData.append("image", image);

        // محاكاة إرسال
        setTimeout(() => {
            
            setLoading(false);
        
        }, 2000);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
            }}
        >
            <Card
                raised
                sx={{
                    maxWidth: 560,
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",

                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    },
                }}
            >
                {/* Header مع أيقونة */}
                <Box
                    sx={{
                        background: "linear-gradient(45deg, #2f973b, #044d23)",
                        color: "white",
                        padding: 4,
                        textAlign: "center",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            mx: "auto",
                            mb: 2,
                            bgcolor: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <Construction sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" fontWeight="bold">
                        Construction Request
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                        Tell us the problem and we will solve it as quickly as possible.
                    </Typography>
                </Box>

                <Box sx={{ p: { xs: 3, sm: 5 } }}>
                    <Stack spacing={4}>

                      
                        <TextField
                            label="Title of the issue"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                            InputProps={{
                                sx: { borderRadius: 3, fontSize: "1.1rem" },
                            }}
                        />

                   
                        <Box>
                            <input
                                accept="image/*"
                                type="file"
                                id="image-upload"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                            <label htmlFor="image-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    fullWidth
                                    startIcon={<PhotoCamera />}
                                    sx={{
                                        py: 3,
                                        borderRadius: 3,
                                        border: "2px dashed",
                                        borderColor: imagePreview ? "success.main" : "grey.400",
                                        bgcolor: imagePreview ? "success.50" : "grey.50",
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        "&:hover": {
                                            bgcolor: imagePreview ? "success.100" : "grey.100",
                                            borderColor: imagePreview ? "success.main" : "primary.main",
                                        },
                                    }}
                                >
                                    {imagePreview ? "uploaded" : "Upload Image"}
                                </Button>
                            </label>

                           
                            {imagePreview && (
                                <Box sx={{ mt: 2, textAlign: "center" }}>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: 300,
                                            borderRadius: 16,
                                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>

                        <TextField
                            label="Detailed description of the issue"
                            multiline
                            rows={5}
                            variant="outlined"
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={{
                                sx: { borderRadius: 3 },
                            }}
                        />

                        {/* زر الإرسال */}
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleSubmit}
                            disabled={loading || !title || !description}
                            startIcon={loading ? null : <Send />}
                            sx={{
                                py: 2,
                                borderRadius: 3,
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                textTransform: "none",
                                background: loading
                                    ? "grey.400"
                                    : "linear-gradient(45deg, #2f973b, #044d23)",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #2f973b, #044d23)",
                                    transform: "translateY(-2px)",
                                },
                                boxShadow: "0 10px 20px rgba(102, 126, 234, 0.3)",
                            }}
                        >
                            {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                        </Button>

                        {loading && <LinearProgress sx={{ borderRadius: 2 }} />}
                    </Stack>
                </Box>
            </Card>
        </Box>
    );
}