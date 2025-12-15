import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  UploadFile,
  PhotoCamera,
  CheckCircle,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";


export default function AccommodationForm() {
  const theme = useTheme();
 
// console.log(theme.direction);
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    campusName: "", faculty: "", firstName: "", lastName: "",
    fatherName: "", motherName: "", nationalId: "", universityId: "",
    studyYear: "", idFront: null, idBack: null, uniIdFront: null,
    uniIdBack: null, residenceDocument: null, hasDisability: false,
    roommate1: "", roommate2: "", roommate3: "",
  });

  const [previews, setPreviews] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      const file = files[0];
      setForm({ ...form, [name]: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => ({ ...prev, [name]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    console.log("Submitted data:", form);
    alert("Request submitted successfully!");
  };

  const steps = [
    { title: "Basic Information", fields: ["campusName", "faculty", "firstName", "lastName"] },
    { title: "Family & ID", fields: ["fatherName", "motherName", "nationalId", "universityId"] },
    { title: "Study & ID Photos", fields: ["studyYear", "idFront", "idBack", "uniIdFront"] },
    { title: "Additional Documents & Preferences", fields: ["uniIdBack", "residenceDocument", "hasDisability", "roommate1", "roommate2", "roommate3"] },
  ];

  const maxSteps = steps.length;
  const progress = ((activeStep + 1) / maxSteps) * 100;

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const FileUploadButton = ({ name, label }) => (
    <Box sx={{ mb: 3 }}>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        startIcon={<PhotoCamera />}
        sx={{
          py: 2.5,
          textTransform: "none",
          borderStyle: "dashed",
          borderColor: form[name] ? "success.main" : "grey.400",
          bgcolor: form[name] ? "success.50" : "grey.50",
          "&:hover": { bgcolor: form[name] ? "success.100" : "grey.100" },
        }}
      >
        {form[name] ? "Uploaded: " + form[name].name : label}
        <input type="file" hidden name={name} onChange={handleChange} accept="image/*,.pdf" />
      </Button>
      {previews[name] && (
        <Box sx={{ mt: 1, textAlign: "center" }}>
          <img src={previews[name]} alt="preview" style={{ maxWidth: "100%", maxHeight: 180, borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 2, sm: 3 } }}>
      <Card sx={{ maxWidth: 680, width: "100%", borderRadius: 4, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" ,   transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                    },}}>
        {/* Header */}
        <Box sx={{ bgcolor: "primary.main", color: "white", p: 4, textAlign: "center" }}>
          <Avatar sx={{ width: 70, height: 70, mx: "auto", mb: 2, bgcolor: "rgba(255,255,255,0.2)" }}>
            <UploadFile sx={{ fontSize: 36 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">Accommodation Request</Typography>
          <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
            Step {activeStep + 1} of {maxSteps}: {steps[activeStep].title}
          </Typography>
        </Box>

        {/* Progress Bar */}
        <LinearProgress variant="determinate" value={progress} sx={{ height: 8, bgcolor: "grey.200" }} color="primary" />

        {/* Form Content */}
        <Box sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={3}>
            {steps[activeStep].fields.map(field => {
              if (field === "hasDisability") {
                return (
                  <FormControlLabel
                    key={field}
                    control={<Checkbox checked={form.hasDisability} name="hasDisability" onChange={handleChange} />}
                    label="Do you have a physical disability?"
                    sx={{ "& .MuiTypography-root": { fontWeight: 500 } }}
                  />
                );
              }
              if (field.includes("Front") || field.includes("Back") || field === "residenceDocument") {
                const labels = {
                  idFront: "Upload National ID Front",
                  idBack: "Upload National ID Back",
                  uniIdFront: "Upload University ID Front",
                  uniIdBack: "Upload University ID Back",
                  residenceDocument: "Upload Residence Document",
                };
                return <FileUploadButton key={field} name={field} label={labels[field]} />;
              }
              const labels = {
                campusName: "Campus Name", faculty: "Faculty", firstName: "First Name", lastName: "Last Name",
                fatherName: "Father's Name", motherName: "Mother's Name", nationalId: "National ID",
                universityId: "University ID", studyYear: "Study Year",
                roommate1: "Roommate 1 (Optional)", roommate2: "Roommate 2 (Optional)", roommate3: "Roommate 3 (Optional)",
              };
              return (
                <TextField
                  key={field}
                  label={labels[field]}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
              );
            })}
          </Stack>

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              sx={{ px: 4, borderRadius: 3 }}
            >
              Back
            </Button>

            {activeStep === maxSteps - 1 ? (
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                endIcon={<CheckCircle />}
                sx={{
                  px: 6,
                  borderRadius: 3,
                  fontWeight: "bold",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                }}
              >
                Submit Request
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                endIcon={theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                sx={{ px: 6, borderRadius: 3, fontWeight: "bold" }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}