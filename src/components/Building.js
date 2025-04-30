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
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import AddIcon from "@mui/icons-material/Add";
import { MapLoaderProvider, useMapLoader } from "../MapLoaderProvider";
import { buildingAction } from "../action/BuildingActions";

const roomTypes = ["Normal", "Deluxe", "Super Deluxe"];
const defaultCenter = { lat: 20.296059, lng: 85.824539 };
const containerStyle = {
  width: "100%",
  height: "100%",
};

const GoogleMapComponent = ({ onLocationChange }) => {
  const { isLoaded } = useMapLoader();
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [selectedPosition, setSelectedPosition] = useState(defaultCenter);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    onLocationChange(defaultCenter);
  }, []);

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
          sx={{ bgcolor: "white" }}
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
  const [floors, setFloors] = useState([{ floor: 1, rooms: [] }]);
  const [newRoomInputs, setNewRoomInputs] = useState([
    { number: "", type: "" },
  ]);
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [buildingLocation, setBuildingLocation] = useState(null);
  const [buildingName, setBuildingName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [managerPassword, setManagerPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [buildingList, setBuildingList] = useState([]);
  const [editingBuilding, setEditingBuilding] = useState(null);

  const fetchBuildings = async () => {
    const result = await buildingAction.getAllBuildings();
    const buildings = result?.data;

    if (Array.isArray(buildings)) {
      setBuildingList(buildings);
    } else {
      console.warn("Unexpected response structure:", result);
      setBuildingList([]);
    }
  };
  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const addFloor = () => {
    setFloors((prev) => [...prev, { floor: prev.length + 1, rooms: [] }]);
    setNewRoomInputs((prev) => [...prev, { number: "", type: "" }]);
  };

  const resetForm = () => {
    setBuildingName("");
    setState("");
    setCity("");
    setAddress("");
    setFloors([{ floor: 1, rooms: [] }]);
    setNewRoomInputs([{ number: "", type: "" }]);
    setBuildingLocation(null);
    setShowManagerForm(false);
    setManagerName("");
    setManagerEmail("");
    setManagerPhone("");
    setManagerPassword("");
    setEditingBuilding(null);
  };

  const handleSubmit = async () => {
    const floorRoomMapData = floors.map((floor) => ({
      floorNo: floor.floor,
      noOfRooms: (floor.rooms || []).length,
      roomDto: (floor.rooms || []).map((room) => ({
        roomNumber: room.number,
        isActive: true,
        isAvailable: true,
        roomTypeId: parseInt(room.type),
      })),
    }));

    const buildingData = {
      name: buildingName,
      address,
      state,
      city,
      latitude: buildingLocation?.lat || null,
      longitude: buildingLocation?.lng || null,
      numberOfFloors: floors.length,
      managerId: null,
      managerName: showManagerForm ? managerName : null,
      managerEmail: showManagerForm ? managerEmail : null,
      managerPhoneNumber: showManagerForm ? managerPhone : null,
      managerPassword: showManagerForm ? managerPassword : null,
      floorRoomMapData,
    };

    try {
      if (editingBuilding) {
        // Update existing building
        const result = await buildingAction.updateBuilding(
          editingBuilding.id,
          buildingData
        );
        if (result) {
          // Reset form after successful update
          resetForm();
          fetchBuildings();
        } else {
          console.error("Building update failed.");
        }
      } else {
        // Create new building
        const result = await buildingAction.createBuilding(buildingData);
        if (result) {
          // Reset form after successful creation
          resetForm();
          fetchBuildings();
        } else {
          console.error("Building creation failed.");
        }
      }
    } catch (error) {
      console.error("Error submitting building:", error);
    }
  };

  const handleEdit = (building) => {
    setEditingBuilding(building);
    setBuildingName(building.name || "");
    setState(building.state || "");
    setCity(building.city || "");
    setAddress(building.address || "");
    setBuildingLocation({
      lat: building.latitude,
      lng: building.longitude,
    });

    if (
      building.managerName ||
      building.managerEmail ||
      building.managerPhoneNumber
    ) {
      setShowManagerForm(true);
      setManagerName(building.managerName || "");
      setManagerEmail(building.managerEmail || "");
      setManagerPhone(building.managerPhoneNumber || "");
      setManagerPassword(""); // Password is not editable
    } else {
      setShowManagerForm(false);
      setManagerName("");
      setManagerEmail("");
      setManagerPhone("");
      setManagerPassword("");
    }

    if (Array.isArray(building.floorRoomMapData)) {
      const updatedFloors = building.floorRoomMapData.map((floor) => ({
        floor: floor.floorNo,
        rooms: (floor.roomDto || []).map((room) => ({
          number: room.roomNumber,
          type: room.roomTypeId.toString() || "",
        })),
      }));
      setFloors(updatedFloors);
      setNewRoomInputs(updatedFloors.map(() => ({ number: "", type: "" })));
    } else {
      setFloors([{ floor: 1, rooms: [] }]);
      setNewRoomInputs([{ number: "", type: "" }]);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Building List
      </Typography>

      <Box component={Paper} p={3} mb={4}>
        <Box>
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
            </Box>
            <GoogleMapComponent onLocationChange={setBuildingLocation} />
          </Box>

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

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}
                >
                  <TextField
                    label="Room Number"
                    value={newRoomInputs[floorIndex]?.number || ""}
                    onChange={(e) => {
                      const updated = [...newRoomInputs];
                      updated[floorIndex].number = e.target.value;
                      setNewRoomInputs(updated);
                    }}
                    sx={{ width: 400 }}
                  />
                  <TextField
                    select
                    label="Room Type"
                    value={newRoomInputs[floorIndex]?.type || ""}
                    onChange={(e) => {
                      const updated = [...newRoomInputs];
                      updated[floorIndex].type = e.target.value;
                      setNewRoomInputs(updated);
                    }}
                    sx={{ width: 400 }}
                  >
                    {roomTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box mt={1}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const room = newRoomInputs[floorIndex];
                      if (!room.number || !room.type) return;

                      const updatedFloors = [...floors];
                      updatedFloors[floorIndex].rooms.push({ ...room });
                      setFloors(updatedFloors);

                      const updatedInputs = [...newRoomInputs];
                      updatedInputs[floorIndex] = { number: "", type: "" };
                      setNewRoomInputs(updatedInputs);
                    }}
                  >
                    Add Room
                  </Button>
                </Box>

                {/* Room Table */}
                {floor.rooms.some((room) => room.number && room.type) && (
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sl No</TableCell>
                          <TableCell>Room Number</TableCell>
                          <TableCell>Room Type</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {floor.rooms.map((room, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{room.number}</TableCell>
                            <TableCell>{room.type}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
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
                  autoComplete="new-email"
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  value={managerPhone}
                  onChange={(e) => setManagerPhone(e.target.value)}
                  sx={{ flex: "1 1 300px" }}
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={managerPassword}
                  onChange={(e) => setManagerPassword(e.target.value)}
                  sx={{ flex: "1 1 300px" }}
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {editingBuilding ? "Update" : "Submit"}
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
                <TableCell>Manager</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildingList.map((building, index) => {
                // Calculate totalRooms only if floorRoomMapData is an array
                const totalRooms = Array.isArray(building.floorRoomMapData)
                  ? building.floorRoomMapData.reduce(
                      (sum, floor) => sum + floor.noOfRooms,
                      0
                    )
                  : 0; // default to 0 if floorRoomMapData is undefined or not an array

                return (
                  <TableRow key={building.id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{building.name}</TableCell>
                    <TableCell>{building.numberOfFloors}</TableCell>
                    <TableCell>{totalRooms}</TableCell>{" "}
                    {/* Display the total rooms here */}
                    <TableCell>{building.state}</TableCell>
                    <TableCell>{building.city}</TableCell>
                    <TableCell>{building.address}</TableCell>
                    <TableCell>{building.managerName || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(building)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Building;
