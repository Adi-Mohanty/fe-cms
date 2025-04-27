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
  TablePagination,
} from "@mui/material";
import { buildingService } from "../../service/buildingService";

function BuildingDetails() {
  const { id } = useParams();
  const [building, setBuilding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 👉 Pagination states for Floor Details
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        setLoading(true);
        const data = await buildingService.getBuildingById(id);
        setBuilding(data);
      } catch (err) {
        setError(err.message || "Failed to fetch building details");
      } finally {
        setLoading(false);
      }
    };

    fetchBuilding();
  }, [id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading building details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!building) {
    return <div>No building found</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Building Details
      </Typography>

      {/* Building Manager and Details */}
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
              <TableCell>Address</TableCell>
              <TableCell>Number of Floors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{building.manager?.name}</TableCell>
              <TableCell>{building.manager?.email}</TableCell>
              <TableCell>{building.manager?.phone}</TableCell>
              <TableCell>{building.name}</TableCell>
              <TableCell>
                {`${building.address?.landmark}, ${building.address?.city}, ${building.address?.state}, ${building.address?.pincode}`}
              </TableCell>
              <TableCell>{building.floors}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Floor Details with Pagination */}
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
            {building.floorDetails
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((floor, index) => (
                <TableRow key={index + page * rowsPerPage}>
                  <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                  <TableCell>{floor.rooms}</TableCell>
                  <TableCell>{floor.rent}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* 👉 Table Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={building.floorDetails?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default BuildingDetails;
