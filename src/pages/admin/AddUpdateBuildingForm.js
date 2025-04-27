import React, { useEffect, useState } from "react";
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";
import { useMapLoader } from "../../MapLoaderProvider";
import { buildingService } from "../../service/buildingService";

const containerStyle = {
  width: "100%",
  height: "300px",
};

function AddUpdateBuildingForm({ open, onClose, id, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    manager: { name: "", email: "", phone: "", password: "" },
    location: { lat: 20.2961, lng: 85.8245 },
    floors: 0,
    floorDetails: [],
    address: {
      city: "",
      landmark: "",
      pincode: "",
      state: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useMapLoader();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchBuilding = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await buildingService.getBuildingById(id);
        console.log("Full response:", res);

        const data = res;
        console.log("Fetched building data:", data);

        setFormData({
          name: data?.name || "",
          manager: {
            name: data?.manager?.name || "",
            email: data?.manager?.email || "",
            phone: data?.manager?.phone || "",
            password: data?.manager?.password || "",
          },
          location: data?.location || { lat: 20.2961, lng: 85.8245 },
          floors: data?.floors || 0,
          floorDetails: data?.floorDetails || [],
          address: data?.address || {
            city: "",
            landmark: "",
            pincode: "",
            state: "",
          },
        });
      } catch (error) {
        console.error("Failed to fetch building data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (open && id) {
      console.log("Dialog open and id present:", id);
      fetchBuilding();
    }
  }, [id, open]);

  // ✅ Reset form only when closing the dialog
  useEffect(() => {
    if (!open && !id) {
      setFormData({
        name: "",
        manager: { name: "", email: "", phone: "", password: "" },
        location: { lat: 20.2961, lng: 85.8245 },
        floors: 0,
        floorDetails: [],
        address: {
          city: "",
          landmark: "",
          pincode: "",
          state: "",
        },
      });
      setErrors({});
    }
  }, [open, id]);

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

    if (key === "email") validateEmail(value);
    if (key === "phone") validatePhone(value);
    if (key === "name") validateManagerName(value);
    if (key === "password") validatePassword(value);
  };

  const handleFloorsChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value));
    setFormData((prev) => ({
      ...prev,
      floors: value,
      floorDetails: Array.from(
        { length: value },
        (_, i) => prev.floorDetails[i] || { rooms: 0, rent: 0 }
      ),
    }));
  };

  const handleFloorDetailChange = (index, key, value) => {
    const updatedValue = Math.max(1, Number(value));
    const updated = [...formData.floorDetails];
    const floor = { ...updated[index] };
    floor[key] = updatedValue;
    updated[index] = floor;

    setFormData((prev) => ({
      ...prev,
      floorDetails: updated,
    }));
  };

  const validateManagerName = (name) => {
    if (!name) {
      setErrors((prev) => ({
        ...prev,
        managerName: "Manager name is required",
      }));
    } else {
      setErrors((prev) => {
        const { managerName, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Enter a valid 10-digit Indian phone number",
      }));
    } else {
      setErrors((prev) => {
        const { phone, ...rest } = prev;
        return rest;
      });
    }
  };

  const validatePassword = (password) => {
    if (!password || password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Building name is required";
    if (!formData.manager.name)
      newErrors.managerName = "Manager name is required";
    if (!formData.manager.email) newErrors.email = "Manager email is required";
    if (!formData.manager.phone)
      newErrors.phone = "Manager phone number is required";
    if (!id && !formData.manager.password)
      newErrors.password = "Password is required";
    if (!formData.location.lat || !formData.location.lng)
      newErrors.location = "Location is required";

    validateEmail(formData.manager.email);
    validatePhone(formData.manager.phone);
    validatePassword(formData.manager.password);

    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length > 0 || Object.keys(errors).length > 0)
      return;

    onSubmit?.(formData);
    onClose();
  };

  useEffect(() => {
    if (formData.name) {
      setErrors((prev) => {
        const { name, ...rest } = prev;
        return rest;
      });
    }
  }, [formData.name]);

  if (!isLoaded) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{id ? "Update" : "Add"} Building</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Manager Details</Typography>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={formData.manager?.name || ""}
            onChange={(e) => handleManagerChange("name", e.target.value)}
            error={!!errors.managerName}
            helperText={errors.managerName}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={formData.manager?.email || ""}
            onChange={(e) => handleManagerChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            autoComplete="new-email"
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            value={formData.manager?.phone || ""}
            onChange={(e) => handleManagerChange("phone", e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            inputProps={{ maxLength: 10 }}
          />

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"} // Toggle between text and password
            label="Password"
            margin="normal"
            value={formData.manager?.password || ""}
            onChange={(e) => handleManagerChange("password", e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            autoComplete="new-password"
            disabled={!!id} // Disable in edit mode
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box mt={3} mb={2}>
            <Typography variant="h6">Building Details</Typography>
            <TextField
              fullWidth
              label="Building Name"
              sx={{ mb: 3, mt: 2 }}
              value={formData.name || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              error={!!errors.name}
              helperText={errors.name}
            />

            <Box mt={3} mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Address Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.address?.city || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={formData.address?.state || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, state: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    value={formData.address?.landmark || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, landmark: e.target.value },
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={formData.address?.pincode || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: { ...prev.address, pincode: e.target.value },
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </Box>

            <Autocomplete
              onLoad={(ac) => setAutocomplete(ac)}
              onPlaceChanged={handlePlaceChanged}
            >
              <TextField
                sx={{ mb: 3 }}
                fullWidth
                placeholder="Search location"
                error={!!errors.location}
                helperText={errors.location}
              />
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
            value={formData.floors || 0}
            onChange={handleFloorsChange}
          />

          {formData.floorDetails.map((floor, index) => (
            <Grid container spacing={2} mt={1} key={index}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={`Floor ${index + 1} - Rooms`}
                  type="number"
                  value={floor?.rooms || 0}
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
                  value={floor?.rent || 0}
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
              {id ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUpdateBuildingForm;
