// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Paper, Typography } from "@mui/material";

// const dashboardList = [
//   { label: "Room Type", description: "Add Room Type", path: "/room-type" },
//   { label: "Buildings", description: "Add Building", path: "/building" },
//   { label: "Managers", description: "Add Manager", path: "/manager" },
// ];

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <React.Fragment>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
//         Admin Dashboard
//       </Typography>
//       <Grid container spacing={2}>
//         {dashboardList.map((dashboard, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Paper
//               onClick={() => handleClick(dashboard.path)}
//               sx={{
//                 p: 2,
//                 cursor: "pointer",
//                 transition: "0.3s",
//                 ":hover": { boxShadow: 6 },
//               }}
//               elevation={3}
//             >
//               <Typography
//                 variant="h5"
//                 align="center"
//                 sx={{
//                   color: (theme) => theme.palette.primary.main,
//                   fontWeight: 600,
//                   mb: 1,
//                 }}
//               >
//                 {dashboard.label}
//               </Typography>
//               <Typography
//                 variant="body1"
//                 align="center"
//                 sx={{ color: (theme) => theme.palette.text.secondary }}
//               >
//                 {dashboard.description}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </React.Fragment>
//   );
// }

// export default AdminDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, Box } from "@mui/material";

const dashboardList = [
  { label: "Room Type", description: "Add Room Type", path: "/room-type" },
  { label: "Buildings", description: "Add Building", path: "/building" },
  { label: "Managers", description: "Add Manager", path: "/manager" },
];

function AdminDashboard() {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 4,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box sx={{ maxWidth: 1400, width: "100%" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Admin Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 4,
            justifyContent: "center",
            flexWrap: "nowrap",
          }}
        >
          {dashboardList.map((dashboard, index) => (
            <Box
              key={index}
              sx={{
                width: "33.33%",
                position: "relative",
                pt: "33.33%", // Creates a square
              }}
            >
              <Paper
                onClick={() => handleClick(dashboard.path)}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  p: 2,
                  ":hover": {
                    boxShadow: 8,
                    transform: "scale(1.03)",
                  },
                }}
                elevation={3}
              >
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {dashboard.label}
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{ color: (theme) => theme.palette.text.secondary }}
                >
                  {dashboard.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default AdminDashboard;
