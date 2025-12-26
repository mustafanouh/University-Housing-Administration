import React, { useState } from "react";
import { useGetAllUnit, useSetUnitGender, useSetUnitRoomCap } from "../../features/admin/admin.queries";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    Alert,
    Button,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigateContext } from "../../context/navigateContext";
import GenderAlert from "../unitsAlert/AlertGender";
import RoomCapDialog from "../unitsAlert/AlertRoomCap";



export default function Units() {
    const Navigate = useNavigateContext();
    const [open, setOpen] = useState(false);
    const [openCap, setOpenCap] = useState(false);
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const { data, isLoading, isError } = useGetAllUnit();
    const { mutate, isLoading: isSetUnitGenderLoading } = useSetUnitGender();
    const { mutate: mutateRoomCap, isLoading: isSetUnitRoomCapLoading } = useSetUnitRoomCap();




    const getGenderChip = (gender) => {
        if (gender === "males")
            return <Chip label="Males" color="primary" size="small" />;
        if (gender === "females")
            return <Chip label="Females" color="secondary" size="small" />;
        return <Chip label={gender} size="small" />;
    };

    // Format date to readable English format
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return format(new Date(dateString), "dd/MM/yyyy - HH:mm");
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "70vh",
                    gap: 3,
                }}
            >
                <CircularProgress size={60} thickness={5} />
                <Typography variant="h6" color="text.secondary">
                    Loading units...
                </Typography>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ maxWidth: 600, mx: "auto", mt: 6 }}>
                <Alert severity="error" variant="filled">
                    An error occurred while loading the data. Please try again later.
                </Alert>
            </Box>
        );
    }







    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>

            <GenderAlert
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={(gender) => {

                    mutate({
                        unitId: selectedUnitId,
                        data: { gender },
                    });

                }}

            />;
            <RoomCapDialog
                open={openCap}
                onClose={() => setOpenCap(false)}
                onConfirm={(cap) => {
                    mutateRoomCap({
                        unitId: selectedUnitId,
                        data: { roomCap : cap },
                    });
                }}
            />
            <Typography
                variant="h4"
                component="h1"
                align="center"
                fontWeight="bold"
                color="primary.main"
                gutterBottom
                sx={{ mb: 5 }}
            >
                Units Management
            </Typography>

            <TableContainer component={Paper} elevation={8} sx={{ borderRadius: 3, overflow: "hidden" }}>
                <Table sx={{ minWidth: 650 }} aria-label="units table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "primary.main" }}>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold", py: 2 }}>
                                ID
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold", py: 2 }}>
                                Name
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold", py: 2 }}>
                                Gender
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold", py: 2 }}>
                                Room Capacity
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold", py: 2 }}>
                                Room Count
                            </TableCell>
                            <TableCell align="center" sx={{ color: "white", fontWeight: "bold", py: 2 }}>
                                Edit Room Capacity
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.length > 0 ? (
                            data.map((unit) => (
                                <TableRow
                                    key={unit.id}
                                    hover
                                    sx={{
                                        "&:last-child td, &:last-child th": { border: 0 },
                                        transition: "background-color 0.3s",
                                        "&:hover": { backgroundColor: "action.hover" },
                                    }}

                                    onClick={() => Navigate(`/Units/rooms/${unit.id}`)}

                                >
                                    <TableCell align="center" sx={{ fontWeight: "medium" }}>
                                        {unit.id}
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "text.primary" }}>
                                        {unit.name}
                                    </TableCell>
                                    <TableCell
                                        sx={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedUnitId(unit.id);
                                            setOpen(true);

                                        }}

                                        align="center">{getGenderChip(unit.gender)}</TableCell>
                                    <TableCell align="center">{unit.room_cap}</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "medium" }}>
                                        {unit.room_count}
                                    </TableCell>
                                    <TableCell
                                        sx={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedUnitId(unit.id);
                                            setOpenCap(true);

                                        }}

                                        align="center"><Button variant="outlined" size="small">Edit</Button></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                    <Typography variant="h6" color="text.secondary">
                                        No units available at the moment
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}