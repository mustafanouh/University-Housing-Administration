import React, { useState } from "react";
import {
  useAddStorageItem,
  useGetStorageItems,
  useUpdateStorageItem,
} from "../../features/storage/storage.queries";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Grid,
  Divider,
  Stack,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StorageAlert from "./StorageAlert.jsx";

export default function Storage() {
  const { data, isError, isLoading, error } = useGetStorageItems();
  const { mutate: addItem } = useAddStorageItem();
  const { mutate: updateItem } = useUpdateStorageItem();

  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    addItem({
      itemName: data.itemName,
      quantity: Number(data.quantity),
    });
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error?.message || "Failed to load data"}
      </Alert>
    );

  const { unit, storage } = data;

  return (
    <Box p={{ xs: 1, md: 3 }}>
      {/* ===== Unit Info ===== */}
    <Paper sx={{ p: 3, mb: 4 }}>
  {/* Header */}
  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
    <ApartmentIcon color="primary" sx={{ fontSize: 42 }} />
    <Typography variant="h5" fontWeight={600}>
      {unit.name}
    </Typography>
  </Stack>

  <Divider sx={{ mb: 3 }} />

  {/* Content */}
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Gender
        </Typography>
        <Typography variant="h6" color="primary">
          {unit.gender}
        </Typography>
      </Box>
    </Grid>

    <Grid  xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Room Capacity
        </Typography>
        <Typography variant="h6" color="primary">
          {unit.room_cap}
        </Typography>
      </Box>
    </Grid>

    <Grid  xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Room Count
        </Typography>
        <Typography variant="h6" color="secondary">
          {unit.room_count}
        </Typography>
      </Box>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "grey.50",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Specialization
        </Typography>
        <Typography variant="h6" color="secondary">
          {unit.specialization}
        </Typography>
      </Box>
    </Grid>
  </Grid>
</Paper>


      {/* ===== Storage Header ===== */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Inventory2Icon color="secondary" />
            <Typography variant="h5">Storage Items</Typography>
          </Stack>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Add Item
          </Button>
        </Stack>
      </Paper>

      {/* ===== Storage Table ===== */}
      <Paper>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {storage.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary">
                      <EditIcon
                        onClick={() => {

                        }}
                      />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ===== Dialog ===== */}
      <StorageAlert
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          handleSubmit(data);
          setOpen(false);
        }}
      />
    </Box>
  );
}
