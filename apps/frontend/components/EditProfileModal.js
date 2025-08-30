import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function EditProfileModal({ open, handleClose, handleFileChange }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Edit Profile Picture</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
        <Box sx={{ mt: 2 }}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </Box>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button variant="contained" onClick={handleClose}>Done</Button>
        </Box>
      </Box>
    </Modal>
  );
}
