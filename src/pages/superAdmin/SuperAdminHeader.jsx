// import { Box, Button, Typography, Modal, TextField, Stack } from '@mui/material'
// import React, { useState } from 'react'

// const SuperAdminHeader = () => {
//     const [open, setOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         companyName: '',
//         adminName: '',
//         phone: '',
//         email: '',
//         password:''
//     });

//     const handleAddAdmin = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setFormData({
//             companyName: '',
//             adminName: '',
//             phone: '',
//             email: '',
//             password:''
//         });
//     };

//     const handleChange = (e) => {
//         setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("New Admin Data:", formData);

//         handleClose();
//     };

//     return (
//         <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
//             <Typography variant="h4" fontWeight="bold">
//                 Super Admin
//             </Typography>
//             <Button variant="contained" onClick={handleAddAdmin}>
//                 Add Building
//             </Button>

//             {/* Modal for Form */}
//             <Modal open={open} onClose={handleClose}>
//                 <Box
//                     component="form"
//                     onSubmit={handleSubmit}
//                     sx={{
//                         position: 'absolute',
//                         top: '50%', left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         bgcolor: 'background.paper',
//                         boxShadow: 24,
//                         p: 4,
//                         borderRadius: 2,
//                         width: 400
//                     }}
//                 >
//                     <Typography variant="h6" mb={2}>Add New Admin</Typography>
//                     <Stack spacing={2}>
//                         <TextField name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} fullWidth required />
//                         <TextField name="adminName" label="Admin Name" value={formData.adminName} onChange={handleChange} fullWidth required />
//                         <TextField name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} fullWidth required />
//                         <TextField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
//                         <TextField name='password' label="Password" type='password' value={formData.password} onChange={handleChange} fullWidth required />
//                         <Button type="submit" variant="contained">Submit</Button>
//                     </Stack>
//                 </Box>
//             </Modal>
//         </Box>
//     );
// };

// export default SuperAdminHeader;


import React, { useState } from 'react';
import {
  Box, Button, Typography, Modal, TextField, Stack,
  AppBar, Toolbar, IconButton, Divider, Grid,
  InputAdornment, Paper
} from '@mui/material';
import {
  Add, Business, Phone, Email, Person,
  Lock, Visibility, VisibilityOff, AddCardIcon
} from '@mui/icons-material';

import { validateForm } from './adminValidate';
const SuperAdminHeader = () => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: '',
    adminName: '',
    phone: '',
    email: '',
    pancard:'',
    password: ''
  });

  const handleAddAdmin = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({
      companyName: '',
      adminName: '',
      phone: '',
      email: '',
      pancard:'',
      password: ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setFormErrors(errors)
      return;
  }
    console.log("New Admin Data:", formData);

    // handleClose();
  };

  return (
    <AppBar position="static" color="default" elevation={2} sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Business sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            Super Admin
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddAdmin}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 2,
            boxShadow: 2
          }}
        >
          Add Building
        </Button>
      </Toolbar>

      {/* Add Admin Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-admin-modal"
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "100%",
            maxWidth: "600px",
            outline: 'none'
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom textAlign={"center"}>
            Add New Admin
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2} display={"flex"} justifyContent="center" flexDirection={"column"}>
            <Grid item xs={12}>
              <TextField
                name="companyName"
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment:(
                    <InputAdornment >
                      <Business  />
                    </InputAdornment>
                  )
                }}
                error={!!formErrors.companyName}
                helperText={formErrors.companyName || ''}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="adminName"
                label="Admin Name"
                value={formData.adminName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment >
                      <Person  />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
                error={!!formErrors.adminName}
                helperText={formErrors.adminName || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment >
                      <Phone  />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
                error={!!formErrors.phone}
                helperText={formErrors.phone || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment >
                      <Email  />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
                error={!!formErrors.email}
                helperText={formErrors.email || ''}
              />
            </Grid>
            {/* pan card */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="pancard"
                label="Pancard"
                type="text"
                value={formData.pancard}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment >
                      <Email  />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
                error={!!formErrors.pancard}
                helperText={formErrors.pancard || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ mb: 3 }}
                error={!!formErrors.password}
                helperText={formErrors.password || ''}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Modal>
    </AppBar>
  );
};

export default SuperAdminHeader;
