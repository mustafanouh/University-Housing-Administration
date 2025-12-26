import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

export default function GenderAlert({ open, onClose, onConfirm }) {
  const [gender, setGender] = useState("");

  const handleConfirm = () => {
    onConfirm(gender);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Select Gender</DialogTitle>

      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="males">males</MenuItem>
            <MenuItem value="females">females</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!gender}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
