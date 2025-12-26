import { useGetUnitRooms } from "../../features/admin/admin.queries";
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function UnitRooms() {
  const { unitId } = useParams();
  const numericUnitId = Number(unitId);

  const { data = [], isLoading, isError, error } =
    useGetUnitRooms(numericUnitId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <TableContainer
      component={Paper}
      sx={{ overflowX: "auto", maxWidth: "100%" }}
    >
      <Typography sx={{ p: 2 }} variant="h6">
        Unit Rooms
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>#</b></TableCell>
            <TableCell><b>Room Number</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((room, index) => (
            <TableRow key={`${room.unitId}-${index}`}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{room.number}</TableCell>
              <TableCell>{room.state}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
