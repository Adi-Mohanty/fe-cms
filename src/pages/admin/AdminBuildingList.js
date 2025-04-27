import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import TopView from "../../components/TopView";
import { useMapLoader } from "../../MapLoaderProvider";
import AddUpdateBuildingForm from "./AddUpdateBuildingForm";
import { buildingService } from "../../service/buildingService";

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
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const res = await buildingService.getAllBuildings();
      setBuildings(res);
    } catch (error) {
      console.error("Error fetching buildings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleFormSubmit = async (data) => {
    try {
      if (selectedBuildingId) {
        await buildingService.updateBuilding(selectedBuildingId, data);
      } else {
        await buildingService.addBuilding(data);
      }
      await fetchBuildings();
      setFormOpen(false);
      setSelectedBuildingId(null);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (!isLoaded || loading) return <div>Loading maps...</div>;

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#f4f6f8",
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <TopView
        breadcrumbs={[{ label: "Dashboard", href: "/" }]}
        title="Admin Dashboard"
        buttonLabel="Add Building"
        onButtonClick={() => {
          setFormOpen(true);
          setSelectedBuildingId(null);
        }}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, width: "100%" }}>
        {buildings.map((building) => (
          <Box
            key={building.id}
            sx={{
              flex: { xs: "1 1 100%", sm: "1 1 calc(25% - 24px)" },
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
                  {building.manager?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {building.manager?.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {building.manager?.phone}
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
          setTimeout(() => setSelectedBuildingId(null), 300);
        }}
        id={selectedBuildingId}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}

export default AdminBuildingList;
