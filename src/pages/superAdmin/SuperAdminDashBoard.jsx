// import React from 'react'
// import { admins } from '../../contant'
// import SuperAdminHeader from './SuperAdminHeader'
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Box, Button, Modal, Typography
// } from '@mui/material'

// const SuperAdminDashBoard = () => {
//   const [open, setOpen] = React.useState(false);
//   const [selectedAdmin, setSelectedAdmin] = React.useState(null);

//   const handleModalOpen = (admin) => {
//     setSelectedAdmin(admin);
//     setOpen(true);
//   };
//   const handleModalClose = () => {
//     setOpen(false);
//     setSelectedAdmin(null);
//   };

//   return (
//     <>
//     <SuperAdminHeader />
//     <Box p={3}>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="admin table">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Company Name</TableCell>
//               <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Name</TableCell>
//               <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Phone</TableCell>
//               <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Email</TableCell>
//               <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Details</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {admins.map((admin) => (
//               <TableRow key={admin.id}>
//                 <TableCell>{admin.companyName}</TableCell>
//                 <TableCell>{admin.adminName}</TableCell>
//                 <TableCell>{admin.phone}</TableCell>
//                 <TableCell>{admin.email}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" onClick={() => handleModalOpen(admin)}>
//                     View Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal */}
//       <Modal open={open} onClose={handleModalClose}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%', left: '50%',
//             transform: 'translate(-50%, -50%)',
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//             width: 400
//           }}
//         >
//           {selectedAdmin && (
//             <>
//               <Typography variant="h6" gutterBottom>Admin Details</Typography>
//               <Typography><b>Company:</b> {selectedAdmin.companyName}</Typography>
//               <Typography><b>Name:</b> {selectedAdmin.adminName}</Typography>
//               <Typography><b>Phone:</b> {selectedAdmin.phone}</Typography>
//               <Typography><b>Email:</b> {selectedAdmin.email}</Typography>
//               <Typography><b>Locations:</b> {selectedAdmin.locations.join(', ')}</Typography>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//     </>
//   )
// }

// export default SuperAdminDashBoard;


import React, { useState } from 'react';
import { admins } from '../../contant';
import SuperAdminHeader from './SuperAdminHeader';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Button, Modal, Typography, Avatar, Chip, Grid, Divider,
  Card, CardContent, IconButton, Tooltip, TextField
} from '@mui/material';
import { Visibility, LocationOn } from '@mui/icons-material';

const SuperAdminDashBoard = () => {
  const [open, setOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);

  const handleModalOpen = (admin) => {
    setSelectedAdmin(admin);
    setEditAdmin(admin); // Copy for editing
    setIsEditing(false);
    setOpen(true);
  };


  const handleModalClose = () => {
    setOpen(false);
    setSelectedAdmin(null);
  };

  
  return (
    <>
      <SuperAdminHeader />
      <Box p={3} sx={{ maxWidth: 1200, margin: '0 auto' }}>
        <Card elevation={2} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Admin Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage all company administrators in the system.
          </Typography>
        </Card>

        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table sx={{ minWidth: 650 }} aria-label="admin table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Company Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }} >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow
                  key={admin.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      transition: 'background-color 0.2s ease'
                    }
                  }}
                >
                  <TableCell sx={{ textAlign: "center" }}>{admin.companyName}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> */}
                    {/* <Avatar 
                        sx={{ 
                          bgcolor: 'primary.light',
                          width: 36, 
                          height: 36,
                          fontSize: '0.9rem'
                        }}
                      >
                        {getInitials(admin.adminName)}
                      </Avatar> */}
                    {admin.adminName}
                    {/* </Box> */}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{admin.phone}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{admin.email}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {/* <Box > */}
                    {/* <Chip 
                        size="small"
                        icon={<LocationOn fontSize="small" />}
                        label={`${admin.locations.length} locations`}
                        variant="outlined"
                        sx={{ mr: 1 }}
                      /> */}
                    <Tooltip title="View Details">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => handleModalOpen(admin)}
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          boxShadow: 1
                        }}
                      >
                        Details
                      </Button>
                    </Tooltip>
                    {/* </Box> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Admin Details Modal */}
        <Modal
          open={open}
          onClose={handleModalClose}
          aria-labelledby="admin-details-modal"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              // width: 450,
              width:"100%",
              // maxWidth: '90vw',
              maxWidth:"600px",
              outline: 'none',

            }}
          >
            {selectedAdmin && (
              <>
                <Typography variant="h6" fontWeight="bold" gutterBottom textAlign={"center"}>
                  Admin Details
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={2} sx={{ mb: 3 }} display={'flex'} justifyContent="space-between">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Company Name"
                      value={editAdmin.companyName}
                      onChange={(e) => setEditAdmin({ ...editAdmin, companyName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Admin Name"
                      value={editAdmin.adminName}
                      onChange={(e) => setEditAdmin({ ...editAdmin, adminName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={editAdmin.phone}
                      onChange={(e) => setEditAdmin({ ...editAdmin, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={editAdmin.email}
                      onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>

                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {isEditing ? (
                    <>
                      <Button
                        onClick={() => {
                          setIsEditing(false);
                          setEditAdmin(selectedAdmin);
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          console.log("Updated admin:", editAdmin);
                          setSelectedAdmin(editAdmin);
                          setIsEditing(false);
                        }}
                        variant="contained"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleModalClose} variant="outlined">Close</Button>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsEditing(true);
                        }}
                      >
                        Update
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Modal>



      </Box>
    </>
  );
};

export default SuperAdminDashBoard;