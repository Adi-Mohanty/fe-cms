// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Button,
//   Grid,
// } from "@mui/material";
// import { managerService } from "../service/managerService";

// function OnboardCompanyModal({ open, onClose }) {
//   const [formData, setFormData] = useState({
//     advancePayment: "",
//     companyName: "",
//     currentOutstanding: "",
//     gstNumber: "",
//     maintenanceCost: "",
//     managerEmail: "",
//     managerName: "",
//     monthlyRent: "",
//     onboardDate: "",
//     panNumber: "",
//     roomsOccupied: "",
//     securityDeposit: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     const newManager = {
//       ...formData,
//       id: Date.now().toString(), // Generate unique ID
//       onboardDate: formData.onboardDate, // Use the onboardDate as is
//     };

//     // Call managerService to add the manager data to local storage
//     managerService
//       .addManager(newManager)
//       .then((addedManager) => {
//         onClose(); // Close modal after successful submission
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     // Ensure onboardDate is in the correct format (YYYY-MM-DD)
//     if (
//       formData.onboardDate &&
//       !/^\d{4}-\d{2}-\d{2}$/.test(formData.onboardDate)
//     ) {
//       setFormData((prevData) => ({
//         ...prevData,
//         onboardDate: new Date().toISOString().split("T")[0], // Set to today's date if not valid
//       }));
//     }
//   }, [formData.onboardDate]);

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Onboard Company</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2}>
//           {Object.keys(formData).map((key) => (
//             <Grid item xs={12} sm={6} key={key}>
//               {key === "onboardDate" ? (
//                 <TextField
//                   fullWidth
//                   label={key.replace(/([A-Z])/g, " $1").toUpperCase()} // Convert camelCase to readable labels
//                   name={key}
//                   type="date"
//                   value={formData[key]} // This should be in the YYYY-MM-DD format
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputLabelProps={{
//                     shrink: true, // Keeps the label above the input for date type
//                   }}
//                 />
//               ) : (
//                 <TextField
//                   fullWidth
//                   label={key.replace(/([A-Z])/g, " $1").toUpperCase()} // Convert camelCase to readable labels
//                   name={key}
//                   value={formData[key]}
//                   onChange={handleChange}
//                   variant="outlined"
//                 />
//               )}
//             </Grid>
//           ))}
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }

// export default OnboardCompanyModal;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { managerActions } from "../../action/managerAction";

const mockVacantFloors = {
  "Floor 1": ["101", "102", "103"],
  "Floor 2": ["201", "202"],
  "Floor 3": ["301", "302", "303", "304"],
};

function AddUpdateCompany() {
  const { id } = useParams(); // get id from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    gstNumber: "",
    panNumber: "",
    managerName: "",
    managerEmail: "",
    managerPhone: "",
    onboardDate: "",
    monthlyRent: "",
    advancePayment: "",
    securityDeposit: "",
    maintenanceCostAmount: "",
    maintenanceCostFrequency: "monthly",
    selectedRooms: [],
  });

  const [selectedFloor, setSelectedFloor] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    if (id) {
      // If id exists, fetch data and prefill
      const loadManagerData = async () => {
        const response = await managerActions.fetchManagerById(id);
        if (response.success) {
          const data = response.data;
          setFormData({
            companyName: data.companyName || "",
            gstNumber: data.gstNumber || "",
            panNumber: data.panNumber || "",
            managerName: data.managerName || "",
            managerEmail: data.managerEmail || "",
            managerPhone: data.managerPhone || "",
            onboardDate: data.onboardDate || "",
            monthlyRent: data.monthlyRent || "",
            advancePayment: data.advancePayment || "",
            securityDeposit: data.securityDeposit || "",
            maintenanceCostAmount: data.maintenanceCostAmount || "",
            maintenanceCostFrequency:
              data.maintenanceCostFrequency || "monthly",
            selectedRooms: data.selectedRooms || [],
          });
          // If you want, you can also set selectedFloor from data
        }
      };
      loadManagerData();
    }
  }, [id]);

  useEffect(() => {
    // Auto calculate advance and security deposit
    const rent = parseFloat(formData.monthlyRent) || 0;
    setFormData((prev) => ({
      ...prev,
      advancePayment: (rent * 0.2).toFixed(2),
      securityDeposit: (rent * 2).toFixed(2),
    }));
  }, [formData.monthlyRent]);

  useEffect(() => {
    // Update rooms when floor is selected
    if (selectedFloor) {
      setAvailableRooms(mockVacantFloors[selectedFloor] || []);
    }
  }, [selectedFloor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomSelection = (room) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedRooms.includes(room);
      return {
        ...prev,
        selectedRooms: alreadySelected
          ? prev.selectedRooms.filter((r) => r !== room)
          : [...prev.selectedRooms, room],
      };
    });
  };

  const handleFormSubmit = async () => {
    let response;
    if (id) {
      // update existing
      response = await managerActions.updateManager({ id, ...formData });
    } else {
      // create new
      response = await managerActions.createManager(formData);
    }

    if (response.success) {
      navigate("/manager"); // redirect to dashboard after success
    } else {
      console.error("Error submitting form", response.error);
      // Optionally show an error toast or alert
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Onboard New Company
      </Typography>
      <Grid container spacing={2}>
        {/* Company Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GST Number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="PAN Number"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
          />
        </Grid>

        {/* Manager Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Manager Name"
            name="managerName"
            value={formData.managerName}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Manager Email"
            name="managerEmail"
            value={formData.managerEmail}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Manager Phone Number"
            name="managerPhone"
            value={formData.managerPhone}
            onChange={handleChange}
          />
        </Grid>

        {/* Rent Info */}
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Onboarding Date"
            name="onboardDate"
            value={formData.onboardDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Monthly Rent"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Advance Payment (20%)"
            name="advancePayment"
            value={formData.advancePayment}
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Security Deposit (2 months)"
            name="securityDeposit"
            value={formData.securityDeposit}
            disabled
          />
        </Grid>

        {/* Maintenance Cost */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Maintenance Cost Frequency</InputLabel>
            <Select
              name="maintenanceCostFrequency"
              value={formData.maintenanceCostFrequency}
              onChange={handleChange}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
              <MenuItem value="annually">Annually</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Maintenance Cost Amount"
            name="maintenanceCostAmount"
            value={formData.maintenanceCostAmount}
            onChange={handleChange}
            type="number"
          />
        </Grid>

        {/* Floor and Rooms Selection */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Select Floor</InputLabel>
            <Select
              value={selectedFloor}
              onChange={(e) => {
                setSelectedFloor(e.target.value);
                setAvailableRooms(mockVacantFloors[e.target.value] || []); // Update availableRooms for selected floor
              }}
            >
              {Object.keys(mockVacantFloors).map((floor) => (
                <MenuItem key={floor} value={floor}>
                  {floor}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {selectedFloor && availableRooms.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Select Rooms for {selectedFloor}
            </Typography>
            <List>
              {availableRooms.map((room) => {
                const roomId = `${selectedFloor}-${room}`; // make sure room ID is unique across floors
                return (
                  <ListItem
                    key={roomId}
                    button
                    onClick={() => handleRoomSelection(roomId)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={formData.selectedRooms.includes(roomId)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={`Room ${room}`} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        )}
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
          {id ? "Update Company" : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}

export default AddUpdateCompany;
