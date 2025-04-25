import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useGetBuildingByIdQuery } from "../../redux/api/adminBuildingApiSlice";

function BuildingDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetBuildingByIdQuery(id);
  const [building, setBuilding] = useState(null);

  useEffect(() => {
    if (data) {
      setBuilding(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading building details...</div>;
  }

  if (!building) {
    return <div>No building found</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Building Details
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Manager Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Name" secondary={building.manager.name} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Email"
                secondary={building.manager.email}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Phone"
                secondary={building.manager.phone}
              />
            </ListItem>
          </List>

          <Typography variant="h6" sx={{ mt: 3, fontWeight: 600 }}>
            Building Details
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Building Name" secondary={building.name} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Location"
                secondary={`${building.location.lat}, ${building.location.lng}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Number of Floors"
                secondary={building.floors}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Floor Details
      </Typography>
      {building.floorDetails.map((floor, index) => (
        <Card sx={{ mb: 2 }} key={index}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Floor {index + 1}
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Rooms" secondary={floor.rooms} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Rent per Room" secondary={floor.rent} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default BuildingDetails;
