import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function RoomCapDialog({ open, onClose, onConfirm }) {
  const [roomCap, setRoomCap] = useState("");

  const handleConfirm = () => {
    if (!roomCap || Number(roomCap) <= 0) return;
    onConfirm(Number(roomCap));
    setRoomCap("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Set Room Capacity</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Room Capacity"
          type="number"
          fullWidth
          value={roomCap}
          onChange={(e) => setRoomCap(e.target.value)}
          inputProps={{ min: 1 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
