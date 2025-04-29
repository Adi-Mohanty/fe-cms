// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Paper,
//   Checkbox,
//   FormControlLabel,
//   Card,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
// } from "@mui/material";
// import { GoogleMap, Marker } from "@react-google-maps/api";
// import AddIcon from "@mui/icons-material/Add";
// import { MapLoaderProvider, useMapLoader } from "../MapLoaderProvider";

// const roomTypes = ["Normal", "Deluxe", "Super Deluxe"];
// const defaultCenter = { lat: 20.296059, lng: 85.824539 };
// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const GoogleMapComponent = ({ onLocationChange }) => {
//   const { isLoaded } = useMapLoader();
//   const [mapCenter, setMapCenter] = useState(defaultCenter);
//   const [selectedPosition, setSelectedPosition] = useState(defaultCenter); // Start with default
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const debounceRef = useRef(null);

//   useEffect(() => {
//     // Notify parent with default location on first render
//     onLocationChange(defaultCenter);
//   }, []); // run once

//   useEffect(() => {
//     if (query.length < 3) {
//       setSuggestions([]);
//       return;
//     }

//     clearTimeout(debounceRef.current);
//     debounceRef.current = setTimeout(() => {
//       fetchSuggestions(query);
//     }, 300);
//   }, [query]);

//   const fetchSuggestions = async (input) => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//           input
//         )}&format=json&addressdetails=1&limit=5`
//       );
//       const data = await res.json();
//       setSuggestions(data);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectSuggestion = (place) => {
//     const lat = parseFloat(place.lat);
//     const lon = parseFloat(place.lon);
//     const position = { lat, lng: lon };
//     setMapCenter(position);
//     setSelectedPosition(position);
//     onLocationChange(position);
//     setQuery("");
//     setSuggestions([]);
//   };

//   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <Card sx={{ width: "100%", height: 400, mt: 2, position: "relative" }}>
//       <Box
//         sx={{ position: "absolute", top: 16, left: 16, zIndex: 10, width: 350 }}
//       >
//         <TextField
//           fullWidth
//           label="Search Location"
//           variant="outlined"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           sx={{ bgcolor: "white" }} // make background visible
//           InputProps={{
//             endAdornment: loading && <CircularProgress size={20} />,
//           }}
//         />
//         {suggestions.length > 0 && (
//           <List
//             sx={{
//               maxHeight: 200,
//               overflowY: "auto",
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               bgcolor: "white",
//               mt: 0.5,
//             }}
//           >
//             {suggestions.map((place, index) => (
//               <ListItem key={index} disablePadding>
//                 <ListItemButton onClick={() => handleSelectSuggestion(place)}>
//                   <ListItemText primary={place.display_name} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Box>

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={mapCenter}
//         zoom={12}
//       >
//         {selectedPosition && <Marker position={selectedPosition} />}
//       </GoogleMap>
//     </Card>
//   );
// };

// function Building() {
//   const [floors, setFloors] = useState([
//     { floor: 1, rooms: [{ number: "", type: "" }] },
//   ]);
//   const [showManagerForm, setShowManagerForm] = useState(false);
//   const [buildings, setBuildings] = useState([]);
//   const [buildingLocation, setBuildingLocation] = useState(null);

//   const addFloor = () => {
//     setFloors((prev) => [
//       ...prev,
//       { floor: prev.length + 1, rooms: [{ number: "", type: "" }] },
//     ]);
//   };

//   const handleRoomChange = (floorIndex, roomIndex, key, value) => {
//     const updatedFloors = [...floors];
//     updatedFloors[floorIndex].rooms[roomIndex][key] = value;
//     setFloors(updatedFloors);
//   };

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
//         Building List
//       </Typography>

//       <Box component={Paper} p={3} mb={4}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//           Add Building
//         </Typography>
//         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//           <TextField
//             label="Building Name"
//             fullWidth
//             sx={{ flex: "1 1 300px" }}
//           />
//           <TextField label="State" fullWidth sx={{ flex: "1 1 300px" }} />
//           <TextField label="City" fullWidth sx={{ flex: "1 1 300px" }} />
//           <TextField label="Address" fullWidth sx={{ flex: "1 1 300px" }} />
//           <TextField label="GST IN" fullWidth sx={{ flex: "1 1 300px" }} />
//         </Box>

//         <GoogleMapComponent onLocationChange={setBuildingLocation} />
//       </Box>

//       <Box component={Paper} p={3} mb={4}>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//             Add Floors & Rooms
//           </Typography>
//           <IconButton onClick={addFloor}>
//             <AddIcon />
//           </IconButton>
//         </Box>

//         {floors.map((floor, floorIndex) => (
//           <Box key={floor.floor} mb={3}>
//             <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//               Floor {floor.floor}
//             </Typography>
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
//               {floor.rooms.map((room, roomIndex) => (
//                 <React.Fragment key={roomIndex}>
//                   <TextField
//                     label="Room Number"
//                     sx={{ flex: "1 1 300px" }}
//                     value={room.number}
//                     onChange={(e) =>
//                       handleRoomChange(
//                         floorIndex,
//                         roomIndex,
//                         "number",
//                         e.target.value
//                       )
//                     }
//                   />
//                   <TextField
//                     select
//                     label="Room Type"
//                     sx={{ flex: "1 1 300px" }}
//                     value={room.type}
//                     onChange={(e) =>
//                       handleRoomChange(
//                         floorIndex,
//                         roomIndex,
//                         "type",
//                         e.target.value
//                       )
//                     }
//                   >
//                     {roomTypes.map((type) => (
//                       <MenuItem key={type} value={type}>
//                         {type}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </React.Fragment>
//               ))}
//             </Box>
//           </Box>
//         ))}
//       </Box>

//       <Box mb={3}>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={showManagerForm}
//               onChange={(e) => setShowManagerForm(e.target.checked)}
//             />
//           }
//           label="Add Manager"
//         />
//         {showManagerForm && (
//           <Box component={Paper} p={3} mt={2}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//               Manager Details
//             </Typography>
//             <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//               <TextField label="Manager Name" sx={{ flex: "1 1 300px" }} />
//               <TextField
//                 label="Email"
//                 type="email"
//                 sx={{ flex: "1 1 300px" }}
//               />
//               <TextField
//                 label="Phone Number"
//                 type="tel"
//                 sx={{ flex: "1 1 300px" }}
//               />
//             </Box>
//             <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//               Submit
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <Box component={Paper} p={3}>
//         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//           Building List
//         </Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sl No</TableCell>
//                 <TableCell>Building Name</TableCell>
//                 <TableCell>Total Floors</TableCell>
//                 <TableCell>Total Rooms</TableCell>
//                 <TableCell>State</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Address</TableCell>
//                 <TableCell>GST IN</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {buildings.map((building, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{building.name}</TableCell>
//                   <TableCell>{building.floors}</TableCell>
//                   <TableCell>{building.rooms}</TableCell>
//                   <TableCell>{building.state}</TableCell>
//                   <TableCell>{building.city}</TableCell>
//                   <TableCell>{building.address}</TableCell>
//                   <TableCell>{building.gst}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// export default function BuildingWrapper() {
//   return (
//     <MapLoaderProvider>
//       <Building />
//     </MapLoaderProvider>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import AddIcon from "@mui/icons-material/Add";
import { MapLoaderProvider, useMapLoader } from "../MapLoaderProvider";

const roomTypes = ["Normal", "Deluxe", "Super Deluxe"];
const defaultCenter = { lat: 20.296059, lng: 85.824539 };
const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMapComponent = ({ onLocationChange }) => {
  const { isLoaded } = useMapLoader();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [selectedPosition, setSelectedPosition] = useState(defaultCenter); // Start with default
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    // Notify parent with default location on first render
    onLocationChange(defaultCenter);
  }, []); // run once

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
  }, [query]);

  const fetchSuggestions = async (input) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          input
        )}&format=json&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    const position = { lat, lng: lon };
    setMapCenter(position);
    setSelectedPosition(position);
    onLocationChange(position);
    setQuery("");
    setSuggestions([]);
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <Card sx={{ width: "100%", height: 400, mt: 2, position: "relative" }}>
      <Box
        sx={{ position: "absolute", top: 16, left: 16, zIndex: 10, width: 350 }}
      >
        <TextField
          fullWidth
          label="Search Location"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ bgcolor: "white" }} // make background visible
          InputProps={{
            endAdornment: loading && <CircularProgress size={20} />,
          }}
        />
        {suggestions.length > 0 && (
          <List
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              border: "1px solid #ccc",
              borderRadius: "4px",
              bgcolor: "white",
              mt: 0.5,
            }}
          >
            {suggestions.map((place, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleSelectSuggestion(place)}>
                  <ListItemText primary={place.display_name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={12}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </Card>
  );
};

function Building() {
  const [floors, setFloors] = useState([
    { floor: 1, rooms: [{ number: "", type: "" }] },
  ]);
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [buildingLocation, setBuildingLocation] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [gst, setGst] = useState("");

  // Manager form state
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState("");

  const addFloor = () => {
    setFloors((prev) => [
      ...prev,
      { floor: prev.length + 1, rooms: [{ number: "", type: "" }] },
    ]);
  };

  const handleRoomChange = (floorIndex, roomIndex, key, value) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].rooms[roomIndex][key] = value;
    setFloors(updatedFloors);
  };
  const handleSubmit = () => {
    const totalRooms = floors.reduce(
      (sum, floor) => sum + floor.rooms.length,
      0
    );

    const newBuilding = {
      name: buildingName,
      state,
      city,
      address,
      gst,
      location: buildingLocation,
      floors: floors.length,
      rooms: totalRooms,
      manager: showManagerForm
        ? {
            name: managerName,
            email: managerEmail,
            phone: managerPhone,
          }
        : null,
    };

    setBuildings((prev) => [...prev, newBuilding]);

    // Optional: Reset the form after submission
    setBuildingName("");
    setState("");
    setCity("");
    setAddress("");
    setGst("");
    setFloors([{ floor: 1, rooms: [{ number: "", type: "" }] }]);
    setBuildingLocation(null);
    setShowManagerForm(false);
    setManagerName("");
    setManagerEmail("");
    setManagerPhone("");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Building List
      </Typography>

      <Box component={Paper} p={3} mb={4}>
        <Box>
          {/* Add Building */}
          <Box mb={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Add Building
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <TextField
                label="Building Name"
                fullWidth
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                sx={{ flex: "1 1 300px" }}
              />
              <TextField
                label="State"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
                sx={{ flex: "1 1 300px" }}
              />
              <TextField
                label="City"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ flex: "1 1 300px" }}
              />
              <TextField
                label="Address"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ flex: "1 1 300px" }}
              />
              <TextField
                label="GST IN"
                fullWidth
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                sx={{ flex: "1 1 300px" }}
              />
            </Box>
            <GoogleMapComponent onLocationChange={setBuildingLocation} />
          </Box>

          {/* Add Floors & Rooms */}
          <Box mb={4}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Add Floors & Rooms
              </Typography>
              <IconButton onClick={addFloor}>
                <AddIcon />
              </IconButton>
            </Box>

            {floors.map((floor, floorIndex) => (
              <Box key={floor.floor} mb={3}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Floor {floor.floor}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                  {floor.rooms.map((room, roomIndex) => (
                    <React.Fragment key={roomIndex}>
                      <TextField
                        label="Room Number"
                        sx={{ flex: "1 1 300px" }}
                        value={room.number}
                        onChange={(e) =>
                          handleRoomChange(
                            floorIndex,
                            roomIndex,
                            "number",
                            e.target.value
                          )
                        }
                      />
                      <TextField
                        select
                        label="Room Type"
                        sx={{ flex: "1 1 300px" }}
                        value={room.type}
                        onChange={(e) =>
                          handleRoomChange(
                            floorIndex,
                            roomIndex,
                            "type",
                            e.target.value
                          )
                        }
                      >
                        {roomTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </React.Fragment>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={showManagerForm}
                onChange={(e) => setShowManagerForm(e.target.checked)}
              />
            }
            label="Add Manager"
          />
          {showManagerForm && (
            <Box component={Paper} p={3} mt={2}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Manager Details
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <TextField
                  label="Manager Name"
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  sx={{ flex: "1 1 300px" }}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={managerEmail}
                  onChange={(e) => setManagerEmail(e.target.value)}
                  sx={{ flex: "1 1 300px" }}
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={managerPhone}
                  onChange={(e) => setManagerPhone(e.target.value)}
                  sx={{ flex: "1 1 300px" }}
                />
              </Box>
            </Box>
          )}

          {/* Submit Button aligned to the right */}
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>

      <Box component={Paper} p={3}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Building List
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sl No</TableCell>
                <TableCell>Building Name</TableCell>
                <TableCell>Total Floors</TableCell>
                <TableCell>Total Rooms</TableCell>
                <TableCell>State</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>GST IN</TableCell>
                <TableCell>Manager</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildings.map((building, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{building.name}</TableCell>
                  <TableCell>{building.floors}</TableCell>
                  <TableCell>{building.rooms}</TableCell>
                  <TableCell>{building.state}</TableCell>
                  <TableCell>{building.city}</TableCell>
                  <TableCell>{building.address}</TableCell>
                  <TableCell>{building.gst}</TableCell>
                  <TableCell>
                    {building.manager
                      ? `${building.manager.name} (${building.manager.phone})`
                      : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default function BuildingWrapper() {
  return (
    <MapLoaderProvider>
      <Building />
    </MapLoaderProvider>
  );
}
