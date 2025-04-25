import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import TopView from "../../components/TopView";
import { useMapLoader } from "../../MapLoaderProvider";
import AddUpdateBuildingForm from "./AddUpdateBuildingForm";
import {
  useAddBuildingMutation,
  useGetAllBuildingsQuery,
  useUpdateBuildingMutation,
} from "../../redux/api/adminBuildingApiSlice";

const buildings = [
  {
    id: 1,
    name: "Headquarters",
    location: { lat: 37.7749, lng: -122.4194 },
    manager: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 234 567 8901",
    },
  },
  {
    id: 2,
    name: "Branch Office",
    location: { lat: 34.0522, lng: -118.2437 },
    manager: {
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 987 654 3210",
    },
  },
];

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "10px",
  overflow: "hidden",
};

function AdminBuildingList() {
  const { isLoaded } = useMapLoader();
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const navigate = useNavigate();

  const { data: buildings = [], isLoading } = useGetAllBuildingsQuery();
  const [addBuilding] = useAddBuildingMutation();

  const [updateBuilding] = useUpdateBuildingMutation();

  const handleFormSubmit = async (data) => {
    try {
      if (selectedBuildingId) {
        await updateBuilding({ id: selectedBuildingId, ...data }).unwrap();
      } else {
        await addBuilding(data).unwrap();
      }
      setFormOpen(false);
      setSelectedBuildingId(null);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (!isLoaded || isLoading) return <div>Loading maps...</div>;

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
        title="Admin Dashboard"
        buttonLabel="Add Building"
        onButtonClick={() => setFormOpen(true)}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          width: "100%",
        }}
      >
        {buildings.map((building) => (
          <Box
            key={building.id}
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(25% - 24px)",
              },
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 4, p: 2, maxWidth: 400 }}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={building.location}
                zoom={12}
              >
                <Marker position={building.location} />
              </GoogleMap>

              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {building.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {building.manager.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {building.manager.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {building.manager.phone}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setSelectedBuildingId(building.id);
                    setFormOpen(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/building/${building.id}`)}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Box>
        ))}
      </Box>

      <AddUpdateBuildingForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedBuildingId(null);
        }}
        uId={selectedBuildingId}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

export default AdminBuildingList;
