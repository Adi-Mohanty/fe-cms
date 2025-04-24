import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Navbar() {
  let userType = "";

  try {
    const userDetails = JSON.parse(localStorage.getItem("loggedInUserDetails"));
    userType = userDetails?.userType || "";
  } catch (err) {
    console.error("Error parsing user details from localStorage", err);
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", boxShadow: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          CMS
        </Typography>

        {userType && (
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {userType}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
