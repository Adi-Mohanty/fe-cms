import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useGetBuildingByIdQuery } from "../../redux/api/adminBuildingApiSlice";

function BuildingDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetBuildingByIdQuery(id);
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    if (data) {
      setBuilding(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading building details...</div>;
  }

  if (!building) {
    return <div>No building found</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Building Details
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Building and Manager Details
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Manager Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Building Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Number of Floors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{building.manager.name}</TableCell>
              <TableCell>{building.manager.email}</TableCell>
              <TableCell>{building.manager.phone}</TableCell>
              <TableCell>{building.name}</TableCell>
              <TableCell>{`${building.location.lat}, ${building.location.lng}`}</TableCell>
              <TableCell>{building.floors}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Floor Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Floor</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Rent per Room</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {building.floorDetails.map((floor, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{floor.rooms}</TableCell>
                <TableCell>{floor.rent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default BuildingDetails;
