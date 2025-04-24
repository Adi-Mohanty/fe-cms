import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Switch,
  Box,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  Edit,
} from "@mui/icons-material";
import TopView from "../../components/TopView";

const dummyData = [
  {
    floor: 1,
    totalRooms: 10,
    occupiedRooms: 6,
    vacantRooms: 4,
    status: true,
    companies: [
      {
        name: "Company A",
        occupied: 3,
        onboardDate: "2024-01-01",
        rent: "₹3000",
        outstanding: "₹500",
        maintenance: "₹200",
      },
      {
        name: "Company B",
        occupied: 3,
        onboardDate: "2024-03-15",
        rent: "₹2500",
        outstanding: "₹0",
        maintenance: "₹150",
      },
    ],
  },
  {
    floor: 2,
    totalRooms: 8,
    occupiedRooms: 5,
    vacantRooms: 3,
    status: false,
    companies: [
      {
        name: "Company C",
        occupied: 5,
        onboardDate: "2024-02-10",
        rent: "₹4000",
        outstanding: "₹800",
        maintenance: "₹250",
      },
    ],
  },
];

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [floorStatus, setFloorStatus] = useState(row.status);

  return (
    <>
      <TableRow>
        <TableCell>{row.floor}</TableCell>
        <TableCell>{row.totalRooms}</TableCell>
        <TableCell>{row.occupiedRooms}</TableCell>
        <TableCell>{row.vacantRooms}</TableCell>
        <TableCell>
          <Switch
            checked={floorStatus}
            onChange={() => setFloorStatus(!floorStatus)}
            color="primary"
          />
        </TableCell>
        <TableCell>
          <IconButton color="primary">
            <Visibility />
          </IconButton>
          <IconButton color="secondary">
            <Edit />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="companies">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Company Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Rooms Occupied
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Onboard Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Monthly RentAction
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Current Outstanding
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Maintenance Cost
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.companies.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.occupied}</TableCell>
                    <TableCell>{company.onboardDate}</TableCell>
                    <TableCell>{company.rent}</TableCell>
                    <TableCell>{company.outstanding}</TableCell>
                    <TableCell>{company.maintenance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function ManagerDashboard() {
  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f4f6f8",
        minHeight: "calc(100vh-64px)",
        width: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <TopView
        breadcrumbs={[{ label: "Dashboard", href: "/" }]}
        title="Manager Dashboard"
        buttonLabel="Onboard Company"
        onButtonClick={() => console.log("Onboard Company Button Clicked")}
      />
      <Box p={2}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Floor No.</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Rooms</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Occupied Rooms
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vacant Rooms</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                {/* <TableCell /> */}
                <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
