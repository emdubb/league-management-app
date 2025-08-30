import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import EditProfileModal from '../components/EditProfileModal';
import EditStatusModal from '../components/EditStatusModal';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

export default function Profile() {
  // Example user data
  const [modalOpen, setModalOpen] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [skaterStatus, setSkaterStatus] = useState('Active');
  const user = {
    skaterName: 'Melissa',
    preferredName: 'Mel',
    legalFirstName: 'Melissa',
    lastName: 'Dubb',
    dob: '1990-05-15',
    pronouns: 'she/her',
    jerseyNumber: 12,
    phone: '5551234567',
    email: 'melissa@example.com',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
    },
  teams: ['Bruin Trouble', 'Kodiak Attack'],
  memberSince: '2022-03-01',
  };

  // Format phone number (US 10 digits)
  function formatPhone(phone) {
    return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`;
  }

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfileImg(ev.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
      <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
        <Avatar src={profileImg} sx={{ width: 120, height: 120 }} />
        <IconButton sx={{ position: 'absolute', bottom: 0, right: 0 }} onClick={handleOpenModal}>
          <EditIcon />
        </IconButton>
      </Box>
      <h1>Hi, {user.skaterName}.</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {user.teams.map((team, idx) => (
          <Chip
            key={team}
            label={team}
            color="primary"
            sx={{ height: 32, fontSize: 16 }}
          />
        ))}
      </div>
      <EditProfileModal open={modalOpen} handleClose={handleCloseModal} handleFileChange={handleFileChange} />
      <hr style={{ width: '100%', margin: '32px 0' }} />
      <h1>League Status</h1>
      <div style={{ textAlign: 'left', width: 320, marginBottom: 16 }}>
        <p><strong>Member Since:</strong> {user.memberSince}</p>
        <p><strong>Skater Status:</strong> {skaterStatus}</p>
        <Button variant="outlined" onClick={() => setStatusModalOpen(true)} sx={{ mt: 1 }}>Change Status</Button>
      </div>
      <EditStatusModal open={statusModalOpen} handleClose={() => setStatusModalOpen(false)} currentStatus={skaterStatus} handleSubmit={setSkaterStatus} />
      <hr style={{ width: '100%', margin: '32px 0' }} />
      <hr style={{ width: '100%', margin: '32px 0' }} />
      <h1>Contact Info</h1>
      <div style={{ textAlign: 'left', width: 320 }}>
        <p><strong>Phone:</strong> {formatPhone(user.phone)}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong><br />
          {user.address.street}<br />
          {user.address.city}, {user.address.state} {user.address.zip}
        </p>
      </div>
      <hr style={{ width: '100%', margin: '32px 0' }} />
      <h1>Personal Info</h1>
      <div style={{ textAlign: 'left', width: 320 }}>
  <p><strong>Skater Name:</strong> {user.skaterName}</p>
        <p><strong>Preferred Name:</strong> {user.preferredName}</p>
        <p><strong>Legal First Name:</strong> {user.legalFirstName}</p>
        <p><strong>Last Name:</strong> {user.lastName}</p>
        <p><strong>Date of Birth:</strong> {user.dob}</p>
        <p><strong>Pronouns:</strong> {user.pronouns}</p>
        <p><strong>Jersey Number:</strong> {user.jerseyNumber}</p>
      </div>
    </div>
  );
}
