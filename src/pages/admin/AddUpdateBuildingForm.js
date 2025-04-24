import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useMapLoader } from "../../MapLoaderProvider";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function AddUpdateBuildingForm({ open, onClose, initialData = {}, onSubmit }) {
  const [formData, setFormData] = React.useState({
    manager: {
      name: initialData.manager?.name || "",
      email: initialData.manager?.email || "",
      phone: initialData.manager?.phone || "",
    },
    location: initialData.location || { lat: 20.2961, lng: 85.8245 },
    floors: initialData.floors || 0,
    floorDetails: initialData.floorDetails || [],
  });

  const [autocomplete, setAutocomplete] = React.useState(null);
  const { isLoaded } = useMapLoader();

  const handlePlaceChanged = () => {
    const place = autocomplete?.getPlace();
    if (place?.geometry?.location) {
      setFormData((prev) => ({
        ...prev,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      }));
    }
  };

  const handleManagerChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      manager: {
        ...prev.manager,
        [key]: value,
      },
    }));
  };

  const handleFloorsChange = (e) => {
    const value = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      floors: value,
      floorDetails: Array.from(
        { length: value },
        (_, i) => prev.floorDetails[i] || { rooms: "", rent: "" }
      ),
    }));
  };

  const handleFloorDetailChange = (index, key, value) => {
    const updated = [...formData.floorDetails];
    updated[index][key] = value;
    setFormData((prev) => ({
      ...prev,
      floorDetails: updated,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
    onClose();
  };

  if (!isLoaded) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? "Update" : "Add"} Building</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Manager Details</Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={formData.manager.name}
            onChange={(e) => handleManagerChange("name", e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={formData.manager.email}
            onChange={(e) => handleManagerChange("email", e.target.value)}
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            value={formData.manager.phone}
            onChange={(e) => handleManagerChange("phone", e.target.value)}
          />

          <Box mt={3} mb={2}>
            <Typography variant="h6">Select Building Location</Typography>
            <Autocomplete
              onLoad={(ac) => setAutocomplete(ac)}
              onPlaceChanged={handlePlaceChanged}
            >
              <TextField fullWidth placeholder="Search location" />
            </Autocomplete>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={formData.location}
              zoom={15}
              onClick={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  location: {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  },
                }))
              }
            >
              <Marker position={formData.location} />
            </GoogleMap>
          </Box>

          <TextField
            type="number"
            fullWidth
            label="Number of Floors"
            value={formData.floors}
            onChange={handleFloorsChange}
          />

          {formData.floorDetails.map((floor, index) => (
            <Grid container spacing={2} mt={1} key={index}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Floor ${index + 1} - Rooms`}
                  type="number"
                  value={floor.rooms}
                  onChange={(e) =>
                    handleFloorDetailChange(index, "rooms", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Floor ${index + 1} - Rent per Room`}
                  type="number"
                  value={floor.rent}
                  onChange={(e) =>
                    handleFloorDetailChange(index, "rent", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          ))}

          <DialogActions sx={{ mt: 3 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {initialData ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUpdateBuildingForm;
