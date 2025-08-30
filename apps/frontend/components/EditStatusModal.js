import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function EditStatusModal({ open, handleClose, currentStatus, handleSubmit }) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const statusDescriptions = {
    Active: 'You are an active member and eligible to participate in all league activities.',
    Inactive: 'You are currently inactive and not eligible to participate until your status changes.',
    Suspended: 'Your membership is suspended. Please contact league officials for more information.',
  };

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const onSubmit = () => {
    handleSubmit(selectedStatus);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Change Skater Status</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
        <RadioGroup value={selectedStatus} onChange={handleChange} sx={{ mt: 2 }}>
          {Object.entries(statusDescriptions).map(([status, desc]) => (
            <Box key={status} sx={{ mb: 2 }}>
              <FormControlLabel value={status} control={<Radio />} label={status} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 4 }}>{desc}</Typography>
            </Box>
          ))}
        </RadioGroup>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button variant="contained" onClick={onSubmit}>Submit</Button>
        </Box>
      </Box>
    </Modal>
  );
}
