import { Box, Button, Typography, Modal, TextField, Stack } from '@mui/material'
import React, { useState } from 'react'

const SuperAdminHeader = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        adminName: '',
        phone: '',
        email: '',
        password:''
    });

    const handleAddAdmin = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData({
            companyName: '',
            adminName: '',
            phone: '',
            email: '',
            password:''
        });
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Admin Data:", formData);

        handleClose();
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="h4" fontWeight="bold">
                Super Admin
            </Typography>
            <Button variant="contained" onClick={handleAddAdmin}>
                Add Building
            </Button>

            {/* Modal for Form */}
            <Modal open={open} onClose={handleClose}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: 400
                    }}
                >
                    <Typography variant="h6" mb={2}>Add New Admin</Typography>
                    <Stack spacing={2}>
                        <TextField name="companyName" label="Company Name" value={formData.companyName} onChange={handleChange} fullWidth required />
                        <TextField name="adminName" label="Admin Name" value={formData.adminName} onChange={handleChange} fullWidth required />
                        <TextField name="phone" label="Phone Number" value={formData.phone} onChange={handleChange} fullWidth required />
                        <TextField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
                        <TextField name='password' label="Password" type='password' value={formData.password} onChange={handleChange} fullWidth required />
                        <Button type="submit" variant="contained">Submit</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default SuperAdminHeader;
