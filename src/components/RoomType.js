// import React, { useState } from "react";
// import {
//   Typography,
//   Box,
//   TextField,
//   MenuItem,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const maintenanceOptions = ["Monthly", "Quarterly", "Yearly"];

// function RoomType() {
//   const [roomType, setRoomType] = useState("");
//   const [monthlyRent, setMonthlyRent] = useState("");
//   const [securityDeposit, setSecurityDeposit] = useState("");
//   const [advance, setAdvance] = useState("");
//   const [maintenancePeriod, setMaintenancePeriod] = useState("");
//   const [maintenanceAmount, setMaintenanceAmount] = useState("");
//   const [roomTypes, setRoomTypes] = useState([]);

//   const handleSubmit = () => {
//     if (
//       roomType &&
//       monthlyRent >= 0 &&
//       securityDeposit >= 0 &&
//       advance >= 0 &&
//       maintenancePeriod &&
//       maintenanceAmount >= 0
//     ) {
//       const newRoom = {
//         roomType,
//         monthlyRent,
//         securityDeposit,
//         advance,
//         maintenancePeriod,
//         maintenanceAmount,
//       };

//       setRoomTypes((prev) => [...prev, newRoom]);
//       setRoomType("");
//       setMonthlyRent("");
//       setSecurityDeposit("");
//       setAdvance("");
//       setMaintenancePeriod("");
//       setMaintenanceAmount("");
//     }
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
//         Room List
//       </Typography>

//       <Box component={Paper} p={3} mb={4}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//           Add Room Type
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <TextField
//             label="Room Type"
//             value={roomType}
//             onChange={(e) => setRoomType(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField
//             label="Monthly Rent"
//             type="number"
//             inputProps={{ min: 0 }}
//             value={monthlyRent}
//             onChange={(e) => setMonthlyRent(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField
//             label="Security Deposit"
//             type="number"
//             inputProps={{ min: 0 }}
//             value={securityDeposit}
//             onChange={(e) => setSecurityDeposit(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField
//             label="Advance"
//             type="number"
//             inputProps={{ min: 0 }}
//             value={advance}
//             onChange={(e) => setAdvance(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField
//             select
//             label="Maintenance Period"
//             value={maintenancePeriod}
//             onChange={(e) => setMaintenancePeriod(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           >
//             {maintenanceOptions.map((option) => (
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             label="Maintenance Amount"
//             type="number"
//             inputProps={{ min: 0 }}
//             value={maintenanceAmount}
//             onChange={(e) => setMaintenanceAmount(e.target.value)}
//             sx={{ width: 340 }}
//           />
//         </Box>

//         <Button variant="contained" color="primary" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Box>

//       <Box component={Paper} p={3}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//           Room Type List
//         </Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Room Type</TableCell>
//                 <TableCell>Monthly Rent</TableCell>
//                 <TableCell>Security Deposit</TableCell>
//                 <TableCell>Advance</TableCell>
//                 <TableCell>Maintenance Period</TableCell>
//                 <TableCell>Maintenance Cost</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {roomTypes.map((room, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{room.roomType}</TableCell>
//                   <TableCell>{room.monthlyRent}</TableCell>
//                   <TableCell>{room.securityDeposit}</TableCell>
//                   <TableCell>{room.advance}</TableCell>
//                   <TableCell>{room.maintenancePeriod}</TableCell>
//                   <TableCell>{room.maintenanceAmount}</TableCell>
//                 </TableRow>
//               ))}
//               {roomTypes.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No data added yet.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// export default RoomType;

import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const maintenanceOptions = ["Monthly", "Quarterly", "Yearly"];

function RoomType() {
  const [roomType, setRoomType] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [advance, setAdvance] = useState("");
  const [maintenancePeriod, setMaintenancePeriod] = useState("");
  const [maintenanceAmount, setMaintenanceAmount] = useState("");
  const [roomTypes, setRoomTypes] = useState([]);

  const handleSubmit = () => {
    if (
      roomType &&
      monthlyRent >= 0 &&
      securityDeposit >= 0 &&
      advance >= 0 &&
      maintenancePeriod &&
      maintenanceAmount >= 0
    ) {
      const newRoom = {
        roomType,
        monthlyRent,
        securityDeposit,
        advance,
        maintenancePeriod,
        maintenanceAmount,
      };

      setRoomTypes((prev) => [...prev, newRoom]);
      setRoomType("");
      setMonthlyRent("");
      setSecurityDeposit("");
      setAdvance("");
      setMaintenancePeriod("");
      setMaintenanceAmount("");
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Room List
      </Typography>

      <Box component={Paper} p={3} mb={4}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Add Room Type
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
            label="Room Type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
          />
          <TextField
            label="Monthly Rent"
            type="number"
            inputProps={{ min: 0 }}
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
          />
          <TextField
            label="Security Deposit"
            type="number"
            inputProps={{ min: 0 }}
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
          />
          <TextField
            label="Advance"
            type="number"
            inputProps={{ min: 0 }}
            value={advance}
            onChange={(e) => setAdvance(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
          />
          <TextField
            select
            label="Maintenance Period"
            value={maintenancePeriod}
            onChange={(e) => setMaintenancePeriod(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
          >
            {maintenanceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Maintenance Amount"
            type="number"
            inputProps={{ min: 0 }}
            value={maintenanceAmount}
            onChange={(e) => setMaintenanceAmount(e.target.value)}
            sx={{ width: 340 }}
          />
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Box component={Paper} p={3}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Room Type List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Type</TableCell>
                <TableCell>Monthly Rent</TableCell>
                <TableCell>Security Deposit</TableCell>
                <TableCell>Advance</TableCell>
                <TableCell>Maintenance Period</TableCell>
                <TableCell>Maintenance Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomTypes.map((room, index) => (
                <TableRow key={index}>
                  <TableCell>{room.roomType}</TableCell>
                  <TableCell>{room.monthlyRent}</TableCell>
                  <TableCell>{room.securityDeposit}</TableCell>
                  <TableCell>{room.advance}</TableCell>
                  <TableCell>{room.maintenancePeriod}</TableCell>
                  <TableCell>{room.maintenanceAmount}</TableCell>
                </TableRow>
              ))}
              {roomTypes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default RoomType;
