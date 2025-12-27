import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function StorageAlert({ open, onClose, onSubmit }) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (!itemName || !quantity) return;
    onSubmit({ itemName, quantity });
    setItemName("");
    setQuantity("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Storage Item</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
