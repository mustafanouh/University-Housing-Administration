import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  Alert,
  Button,
} from "@mui/material";
import { useAgreeMaintenanceRequest, useGetAllMaintenanceRequest } from "../../features/admin/admin.queries";
import { useNavigateContext } from "../../context/navigateContext";
export default function MaintenanceRequestsTable() {
  const Navigate = useNavigateContext();
  const { data, isLoading, isError, error } =
    useGetAllMaintenanceRequest();


  const { mutate: agreeRequest, isLoading: isAgreeing } = useAgreeMaintenanceRequest();

  const handleAgree = (requestId) => {
    agreeRequest(requestId);
  };





  if (isLoading) {
    return (
      <Box height="60vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Failed to load maintenance requests: {error.message}
        </Alert>
      </Box>
    );
  }

  // Empty
  if (data.length === 0) {
    return (
      <Box p={3}>
        <Alert severity="info">No maintenance requests found.</Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Maintenance Requests ({data.length})
      </Typography>
      <Button color="white"
        onClick={() => Navigate("/MaintenanceRequestsTable/MaintenanceProgress")}
      >show  Maintenance Progress</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><b>Unit</b></TableCell>
              <TableCell><b>Room</b></TableCell>
              <TableCell><b>Manager</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>agreed</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell>{item.unitId}</TableCell>
                <TableCell>{item.roomId}</TableCell>
                <TableCell>
                  {item.unitManager.firstName}{" "}
                  {item.unitManager.lastName}
                </TableCell>
                <TableCell>{item.unitManager.email}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Chip
                    label={item.agreed ? "Approved" : "Pending"}
                    color={item.agreed ? "success" : "warning"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleAgree(item.roomId)}
                    disabled={item.agreed || isAgreeing}
                  >
                    Agree {}
                  </Button>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
