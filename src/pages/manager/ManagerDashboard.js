// import { useEffect, useState } from "react";
// import { managerActions } from "../../action/managerAction";
// import {
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import TopView from "../../components/TopView";
// import Row from "../components/Row"; // your Row component for collapsible row

// export default function ManagerDashboard() {
//   const [managers, setManagers] = useState([]);

//   useEffect(() => {
//     async function fetchManagers() {
//       const response = await managerActions.fetchAllManagers();
//       if (response.success) {
//         setManagers(response.data);
//       } else {
//         console.error(response.error);
//       }
//     }
//     fetchManagers();
//   }, []);

//   return (
//     <Box
//       sx={{
//         p: 4,
//         backgroundColor: "#f4f6f8",
//         minHeight: "calc(100vh - 64px)",
//         width: "100%",
//         overflowX: "hidden",
//         boxSizing: "border-box",
//       }}
//     >
//       <TopView
//         breadcrumbs={[{ label: "Dashboard", href: "/" }]}
//         title="Manager Dashboard"
//         buttonLabel="Onboard Company"
//         onButtonClick={() => console.log("Onboard Company Button Clicked")}
//       />
//       <Box p={2}>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>
//                   Rooms Occupied
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Onboard Date</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Monthly Rent</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>
//                   Current Outstanding
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>
//                   Maintenance Cost
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {managers.map((row, index) => (
//                 <Row key={index} row={row} />
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Box,
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
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import TopView from "../../components/TopView";
import { managerService } from "../../service/managerService";
import { useNavigate } from "react-router-dom";
import { buildingActions } from "../../action/buildingActions";

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [floorStatus, setFloorStatus] = useState(row.isOpen);

  return (
    <>
      <TableRow>
        <TableCell>{row.floor}</TableCell>
        <TableCell>{row.totalRooms}</TableCell>
        <TableCell>{row.occupiedRooms}</TableCell>
        <TableCell>{row.vacantRooms}</TableCell>
        <TableCell>{row.isOpen ? "Open" : "Close"}</TableCell>
        <TableCell>
          <Switch
            checked={floorStatus}
            onChange={() => setFloorStatus(!floorStatus)}
            color="primary"
          />
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
                <TableRow sx={{ backgroundColor: "rgba(182, 232, 243,0.4)" }}>
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
                    Monthly Rent
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
  const [openModal, setOpenModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const [floorsData, setFloorsData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadFloors = async () => {
      const response = await buildingActions.fetchAllBuildings();
      console.log("rsponse", response.data);
      if (response.success) {
        setFloorsData(response?.data);
      } else {
        console.error(response.error);
      }
    };
    loadFloors();
  }, []);

  const handleAddCompanyClick = () => {
    navigate("/company/add");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
        onButtonClick={handleAddCompanyClick}
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
                <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {floorsData?.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* <OnboardCompanyModal open={openModal} onClose={handleCloseModal} /> */}
    </Box>
  );
}
