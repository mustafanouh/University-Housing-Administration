import { useEmployeesQuery } from "../../features/admin/admin.queries";



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
  Alert,
} from "@mui/material";

export default function EmployeesManagement() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useEmployeesQuery();
console.log("EmployeesManagement data:", data);
  const employees = data ?? [];

  // Loading
  if (isLoading) {
    return (
      <Box
        height="60vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error
  if (isError) {
    return (
      <Box p={4}>
        <Alert severity="error">
          Failed to load employees: {error.message}
        </Alert>
      </Box>
    );
  }

  // Empty
  if (employees.length === 0) {
    return (
      <Box p={4}>
        <Alert severity="info">No employees found.</Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Employees Management ({employees.length})
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>First Name</b></TableCell>
              <TableCell><b>Last Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Specialization</b></TableCell>
              <TableCell><b>Unit</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((emp, index) => (
              <TableRow key={index} hover>
                <TableCell>{emp.firstName}</TableCell>
                <TableCell>{emp.lastName}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.specialization}</TableCell>
                <TableCell>
                  {emp.unitId ?? "Not Assigned"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

