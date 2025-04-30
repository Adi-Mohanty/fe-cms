import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function Manager() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [building, setBuilding] = useState("");
  const [buildingOptions, setBuildingOptions] = useState([]);

  // Placeholder effect for fetching building options (API call later)
  useEffect(() => {
    const fetchBuildings = async () => {
      // Simulate API call
      const data = []; // Replace with API result
      setBuildingOptions(data);
    };

    fetchBuildings();
  }, []);

  const handleSubmit = () => {
    console.log("Submit button clicked");
  };

  const handleEditClick = (id) => {
    console.log(`Edit clicked for manager ID: ${id}`);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Managers
      </Typography>

      {/* Manager Form */}
      <Box component={Paper} p={3} mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Add Manager
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
            autoComplete="off"
            name="manager-name"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
            autoComplete="new-email"
            name="manager-email"
          />
          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
            autoComplete="off"
            name="manager-phone"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
            autoComplete="new-password"
            name="manager-password"
          />
          <TextField
            label="Role"
            select
            value="Manager"
            fullWidth
            onChange={() => {}}
            sx={{ flex: "1 1 300px" }}
            name="manager-role"
          >
            <MenuItem value="Manager">Manager</MenuItem>
          </TextField>
          <TextField
            label="Select Building"
            select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            fullWidth
            sx={{ width: 340 }}
            name="manager-building"
          />
        </Box>

        <Box textAlign="right">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>

      {/* Manager List */}
      <Box component={Paper} p={3}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Manager List
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Assigned Building</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Placeholder single row for now */}
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Bishnu Prasad</TableCell>
                <TableCell>bishnu@example.com</TableCell>
                <TableCell>7978622371</TableCell>
                <TableCell>Manager</TableCell>
                <TableCell>DLF</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(1)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Manager;
