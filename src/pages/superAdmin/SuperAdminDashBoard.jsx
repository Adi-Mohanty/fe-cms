import React from 'react'
import { admins } from '../../contant'
import SuperAdminHeader from './SuperAdminHeader'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Box, Button, Modal, Typography
} from '@mui/material'

const SuperAdminDashBoard = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedAdmin, setSelectedAdmin] = React.useState(null);

  const handleModalOpen = (admin) => {
    setSelectedAdmin(admin);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <>
    <SuperAdminHeader />
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Company Name</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.companyName}</TableCell>
                <TableCell>{admin.adminName}</TableCell>
                <TableCell>{admin.phone}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleModalOpen(admin)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal open={open} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 400
          }}
        >
          {selectedAdmin && (
            <>
              <Typography variant="h6" gutterBottom>Admin Details</Typography>
              <Typography><b>Company:</b> {selectedAdmin.companyName}</Typography>
              <Typography><b>Name:</b> {selectedAdmin.adminName}</Typography>
              <Typography><b>Phone:</b> {selectedAdmin.phone}</Typography>
              <Typography><b>Email:</b> {selectedAdmin.email}</Typography>
              <Typography><b>Locations:</b> {selectedAdmin.locations.join(', ')}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
    </>
  )
}

export default SuperAdminDashBoard;
