// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import EditIcon from "@mui/icons-material/Edit";
// import { managerActions } from "../action/ManagerActions";
// function Manager() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [building, setBuilding] = useState("");
//   const [buildingOptions, setBuildingOptions] = useState([]);
//   const [managerList, setManagerList] = useState([]);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const buildings = await managerActions.fetchBuildings();
//       const managers = await managerActions.fetchManagers();
//       setBuildingOptions(buildings);
//       setManagerList(managers);
//     };
//     fetchData();
//   }, []);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

//   const handleSubmit = async () => {
//     if (!name || !email || !phone || !password || !building) {
//       alert("Please fill in all fields.");
//       return;
//     }
//     if (!isValidEmail(email)) {
//       alert("Invalid email format.");
//       return;
//     }
//     if (!isValidPhone(phone)) {
//       alert("Invalid phone number.");
//       return;
//     }

//     const managerData = {
//       name,
//       email,
//       phone,
//       password,
//       buildingId: building,
//       role: "Manager",
//     };

//     const result = await managerActions.createManager(managerData);
//     if (result) {
//       alert("Manager created successfully!");
//       const updatedManagers = await managerActions.fetchManagers();
//       setManagerList(updatedManagers);
//       // Clear form
//       setName("");
//       setEmail("");
//       setPhone("");
//       setPassword("");
//       setBuilding("");
//     } else {
//       alert("Failed to create manager.");
//     }
//   };

//   const handleEditClick = (id) => {
//     console.log(`Edit clicked for manager ID: ${id}`);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
//         Managers
//       </Typography>

//       {/* Manager Form */}
//       <Box component={Paper} p={3} mb={4}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//           Add Manager
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
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField
//             label="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             error={email !== "" && !isValidEmail(email)}
//             helperText={
//               email !== "" && !isValidEmail(email)
//                 ? "Please enter a valid email address"
//                 : ""
//             }
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />

//           <TextField
//             label="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             inputProps={{ maxLength: 10 }}
//             error={phone !== "" && !isValidPhone(phone)}
//             helperText={
//               phone !== "" && !isValidPhone(phone)
//                 ? "Enter a valid 10-digit Indian mobile number"
//                 : ""
//             }
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={togglePasswordVisibility} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             label="Role"
//             select
//             value="Manager"
//             fullWidth
//             onChange={() => {}}
//             sx={{ flex: "1 1 300px" }}
//           >
//             <MenuItem value="Manager">Manager</MenuItem>
//           </TextField>
//           <TextField
//             label="Select Building"
//             select
//             value={building}
//             onChange={(e) => setBuilding(e.target.value)}
//             fullWidth
//             sx={{ width: 340 }}
//           >
//             {buildingOptions.map((b) => (
//               <MenuItem key={b.id} value={b.id}>
//                 {b.name}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Box>

//         <Box textAlign="right">
//           <Button variant="contained" color="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Box>
//       </Box>

//       {/* Manager List */}
//       <Box component={Paper} p={3}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//           Manager List
//         </Typography>

//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sl No</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Assigned Building</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {managerList.map((manager, index) => (
//                 <TableRow key={manager.id}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{manager.userName}</TableCell>
//                   <TableCell>{manager.email}</TableCell>
//                   <TableCell>{manager.phoneNumber}</TableCell>
//                   <TableCell>{manager.role}</TableCell>
//                   <TableCell>{manager.buildingName}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleEditClick(manager.id)}>
//                       <EditIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {managerList.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={7} align="center">
//                     No managers found.
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

// export default Manager;

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
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { managerActions } from "../action/ManagerActions";
function Manager() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [building, setBuilding] = useState("");
  const [buildingOptions, setBuildingOptions] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching buildings
        const buildings = await managerActions.fetchBuildings();
        console.log("Buildings fetched:", buildings);

        // Check if buildings are valid and map the building options
        if (Array.isArray(buildings) && buildings.length > 0) {
          const buildingOptions = buildings.map((building) => ({
            id: building.id,
            name: building.name,
          }));
          console.log("Mapped Building Options:", buildingOptions);
          setBuildingOptions(buildingOptions);
        } else {
          console.error("No valid buildings available.");
          setBuildingOptions([]); // Empty if no valid buildings
        }

        // Fetching managers
        const managers = await managerActions.fetchManagers();
        setManagerList(managers);
      } catch (error) {
        console.error("Error fetching buildings or managers:", error);
      }
    };

    fetchData();
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

  const handleSubmit = async () => {
    if (!name || !email || !phone || !password || !building) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Invalid email format.");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("Invalid phone number.");
      return;
    }

    const managerData = {
      managerName: name,
      managerEmail: email,
      managerPhoneNumber: phone,
      managerPassword: password,
      buildingId: building,
      companyId: 1, // Hardcoded for now
    };

    const result = await managerActions.createManager(managerData);
    if (result) {
      alert("Manager created successfully!");
      const updatedManagers = await managerActions.fetchManagers();
      setManagerList(updatedManagers);
      // Clear form
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setBuilding("");
    } else {
      alert("Failed to create manager.");
    }
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
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email !== "" && !isValidEmail(email)}
            helperText={
              email !== "" && !isValidEmail(email)
                ? "Please enter a valid email address"
                : ""
            }
            fullWidth
            sx={{ flex: "1 1 300px" }}
          />

          <TextField
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputProps={{ maxLength: 10 }}
            error={phone !== "" && !isValidPhone(phone)}
            helperText={
              phone !== "" && !isValidPhone(phone)
                ? "Enter a valid 10-digit Indian mobile number"
                : ""
            }
            fullWidth
            sx={{ flex: "1 1 300px" }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ flex: "1 1 300px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Role"
            select
            value="Manager"
            fullWidth
            onChange={() => {}}
            sx={{ flex: "1 1 300px" }}
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
          >
            {buildingOptions.length === 0 ? (
              <MenuItem value="">No buildings available</MenuItem>
            ) : (
              buildingOptions.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))
            )}
          </TextField>
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
              {managerList.map((manager, index) => (
                <TableRow key={manager.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{manager.userName}</TableCell>
                  <TableCell>{manager.email}</TableCell>
                  <TableCell>{manager.phoneNumber}</TableCell>
                  <TableCell>{manager.role}</TableCell>
                  <TableCell>{manager.buildingName}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(manager.id)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {managerList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No managers found.
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

export default Manager;
