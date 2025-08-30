import React, { useState, useContext } from 'react';
import { SignedUpGamesContext } from '../SignedUpGamesContext';
// ...existing code...
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EventIcon from '@mui/icons-material/Event';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { initialActivities } from '../data/activities';
import { games } from '../data/games';
import { shiftTypes } from '../data/shifts';
const gameCardColor = '#ffebee';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

function Volunteer() {
  const { addSignedUpGame } = useContext(SignedUpGamesContext);
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [shiftForm, setShiftForm] = useState({
    type: '',
    role: '',
    forSelf: 'yes',
    name: '',
    isAdult: 'yes',
  });

  // Open modal for game
  const handleOpenModal = (game) => {
    setSelectedGame(game);
    setShiftForm({ type: '', role: '', forSelf: 'yes', name: '', isAdult: 'yes' });
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGame(null);
  };

  // Handle shift form changes
  const handleShiftFormChange = (e) => {
    const { name, value } = e.target;
    setShiftForm(f => ({ ...f, [name]: value }));
  };

  // Get selected type and roles
  const selectedTypeObj = shiftTypes.find(t => t.type === shiftForm.type);
  const selectedRoleObj = selectedTypeObj?.roles.find(r => r.name === shiftForm.role);

  // Handle shift sign up submit
  const handleShiftSubmit = (e) => {
    e.preventDefault();
    const newShift = {
      date: selectedGame.date,
      title: `${selectedGame.name} - ${shiftForm.type} - ${shiftForm.role}`,
      type: 'Shift',
      hours: 2,
      description: `Role for ${shiftForm.forSelf === 'yes' ? 'yourself' : shiftForm.name}. ${selectedRoleObj?.description || ''}`
    };
    setActivities(prev => [newShift, ...prev]);
    addSignedUpGame(newShift);
    setModalOpen(false);
    setSelectedGame(null);
  };
  const [tab, setTab] = useState(0);
  // Pagination state for activity log
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const [activities, setActivities] = useState(initialActivities);
  const pageCount = Math.ceil(activities.length / itemsPerPage);
  const pagedActivities = activities.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Form state
  const [form, setForm] = useState({
    type: 'Shift',
    date: '',
    hours: '',
    title: '',
    description: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Calculate total hours for status
  const totalHours = activities.reduce((sum, a) => sum + Number(a.hours), 0);
  // Get today's date for comparison
  const today = new Date();
  // Helper to check if a date is in the current quarter
  function isInCurrentQuarter(dateStr) {
    const date = new Date(dateStr);
    const year = today.getFullYear();
    const quarter = Math.floor(today.getMonth() / 3);
    return date.getFullYear() === year && Math.floor(date.getMonth() / 3) === quarter;
  }
  // Completed shifts: date in past and in current quarter
  const completedGameShifts = activities.filter(a => {
    return a.type === 'Shift' && a.title.includes('-') && isInCurrentQuarter(a.date) && new Date(a.date) < today;
  }).length;
  // Pending shifts: date in future and in current quarter
  const pendingGameShifts = activities.filter(a => {
    return a.type === 'Shift' && a.title.includes('-') && isInCurrentQuarter(a.date) && new Date(a.date) >= today;
  }).length;

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const isQuarterHour = (value) => {
    // Accepts decimals ending in .00, .25, .5, .75
    const num = Number(value);
    if (isNaN(num)) return false;
    const decimal = num % 1;
    return [0, 0.25, 0.5, 0.75].includes(Number(decimal.toFixed(2)));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    if (!form.date || !form.hours || !form.title) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!isQuarterHour(form.hours)) {
      setError('Hours must be a number ending in .00, .25, .5, or .75');
      return;
    }
    setActivities(prev => [
      { ...form, hours: Number(form.hours) },
      ...prev
    ]);
    setForm({ type: 'Shift', date: '', hours: '', title: '', description: '' });
    setPage(1);
    setSuccess(true);
  };

  return (
    <div style={{ padding: 32 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="volunteer tabs">
          <Tab label="Activity" />
          <Tab label="Log Work" />
          <Tab label="Game Shifts" />
          <Tab label="How To" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <Box sx={{ maxHeight: 500, overflowY: 'auto' }}>
          <h2>Activity</h2>
          <h3>Status</h3>
          <p><strong>Hours this month:</strong> {totalHours}</p>
          <p>
            <strong>Game shifts this quarter:</strong> {completedGameShifts}
            {pendingGameShifts > 0 && (
              <span style={{ color: '#1976d2', marginLeft: 8 }}>
                &nbsp;(+{pendingGameShifts} pending sign-up{pendingGameShifts > 1 ? 's' : ''})
              </span>
            )}
          </p>
          <hr style={{ margin: '24px 0' }} />
          <h3>Upcoming Shifts</h3>
          <Stack spacing={2} sx={{ marginBottom: 3 }}>
            {activities
              .filter(a => a.type === 'Shift' && a.title.includes('-'))
              .map((activity, idx) => {
                // Parse type and role from title
                const parts = activity.title.split(' - ');
                const gameName = parts[0];
                const shiftType = parts[1] || '';
                const shiftRole = parts[2] || '';
                // Extract name from description if present
                let forName = '';
                const match = activity.description.match(/Role for ([^\.]+)\./);
                if (match && match[1] && match[1] !== 'yourself') {
                  forName = match[1];
                }
                return (
                  <Card key={idx} sx={{ background: gameCardColor, display: 'flex', alignItems: 'center', minWidth: 320 }}>
                    <div style={{ padding: 16 }}><EventIcon sx={{ color: '#d32f2f' }} /></div>
                    <CardContent>
                      <Typography variant="h6">{gameName}</Typography>
                      <Typography variant="body2">{activity.date}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2', marginTop: 1 }}>{shiftType} — {shiftRole}</Typography>
                      {forName && (
                        <Typography variant="body2" sx={{ color: '#333', marginTop: 1 }}>For: {forName}</Typography>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
          </Stack>
          <h3>Activity Log</h3>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {pagedActivities.map((activity, idx) => (
              <li key={idx} style={{ marginBottom: 12, padding: 8, borderBottom: '1px solid #eee' }}>
                <strong>{activity.date}</strong> — {activity.title} ({activity.type}) — <strong>{activity.hours} hrs</strong>
                {activity.description && <div style={{ fontSize: '0.95em', color: '#666', marginTop: 4 }}>{activity.description}</div>}
              </li>
            ))}
          </ul>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Box>
      )}
      {tab === 1 && (
        <Box>
          <h2>Log Work</h2>
          <p>Log your volunteer hours and activities here.</p>
          <div style={{ background: '#fff3e0', color: '#d32f2f', padding: '12px 16px', borderRadius: 6, marginBottom: 16, fontWeight: 500 }}>
            <span style={{ fontWeight: 700 }}>Warning:</span> Do not log game shifts under work. Game shifts will be automatically credited based on your sign ups.
          </div>
          <form onSubmit={handleFormSubmit} style={{ maxWidth: 400, marginTop: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Type of Work
              <select name="type" value={form.type} onChange={handleFormChange} style={{ width: '100%', marginTop: 4 }}>
                <option value="Shift">Shift</option>
                <option value="Work">Work</option>
                <option value="Meeting">Meeting</option>
              </select>
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Date
              <input type="date" name="date" value={form.date} onChange={handleFormChange} style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Hours
              <input type="number" name="hours" value={form.hours} onChange={handleFormChange} min="0" step="0.25" style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Title
              <input type="text" name="title" value={form.title} onChange={handleFormChange} style={{ width: '100%', marginTop: 4 }} />
            </label>
            <label style={{ display: 'block', marginBottom: 8 }}>
              Description
              <textarea name="description" value={form.description} onChange={handleFormChange} style={{ width: '100%', marginTop: 4 }} />
            </label>
            <button type="submit" style={{ marginTop: 12, padding: '8px 16px' }}>Add Activity</button>
          </form>
          {success && <div style={{ color: 'green', marginTop: 12 }}>Activity added successfully!</div>}
          {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <h2>Game Shifts</h2>
          <p>View and sign up for available volunteer game shifts.</p>
          <Stack spacing={2} sx={{ marginTop: 2 }}>
            {games.map((game, idx) => (
              <Card key={idx} sx={{ background: gameCardColor, display: 'flex', alignItems: 'center', minWidth: 320, cursor: 'pointer' }} onClick={() => handleOpenModal(game)}>
                <div style={{ padding: 16 }}><EventIcon sx={{ color: '#d32f2f' }} /></div>
                <CardContent>
                  <Typography variant="h6">{game.name}</Typography>
                  <Typography variant="body2">{game.date} &bull; {game.time}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <DialogTitle>Sign Up for Game Shift</DialogTitle>
            <DialogContent>
              <form onSubmit={handleShiftSubmit}>
                <FormLabel>Shift Type</FormLabel>
                <Select name="type" value={shiftForm.type} onChange={handleShiftFormChange} fullWidth sx={{ mb: 2 }} required>
                  <MenuItem value="">Select Type</MenuItem>
                  {shiftTypes.map((t) => (
                    <MenuItem key={t.type} value={t.type}>{t.type}</MenuItem>
                  ))}
                </Select>
                {selectedTypeObj && (
                  <Typography variant="body2" sx={{ mb: 2 }}>{selectedTypeObj.description}</Typography>
                )}
                {selectedTypeObj && (
                  <>
                    <FormLabel>Role</FormLabel>
                    <RadioGroup name="role" value={shiftForm.role} onChange={handleShiftFormChange} sx={{ mb: 2 }} required>
                      {selectedTypeObj.roles.map((r) => (
                        <FormControlLabel key={r.name} value={r.name} control={<Radio required />} label={
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{r.name}</Typography>
                            <Typography variant="caption">{r.description}</Typography>
                          </Box>
                        } />
                      ))}
                    </RadioGroup>
                  </>
                )}
                {shiftForm.role && (
                  <>
                    <FormLabel>Is this role for yourself?</FormLabel>
                    <RadioGroup name="forSelf" value={shiftForm.forSelf} onChange={handleShiftFormChange} row sx={{ mb: 2 }}>
                      <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                    {shiftForm.forSelf === 'no' && (
                      <>
                        <TextField name="name" label="Name for role" value={shiftForm.name} onChange={handleShiftFormChange} fullWidth sx={{ mb: 2 }} required />
                        <FormLabel>Is the skater 18 or older?</FormLabel>
                        <RadioGroup name="isAdult" value={shiftForm.isAdult} onChange={handleShiftFormChange} row sx={{ mb: 2 }}>
                          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                      </>
                    )}
                  </>
                )}
                <DialogActions>
                  <Button onClick={handleCloseModal}>Cancel</Button>
                  <Button type="submit" variant="contained" disabled={!shiftForm.type || !shiftForm.role || (shiftForm.forSelf === 'no' && !shiftForm.name)}>Sign Up</Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </Box>
      )}
      {tab === 3 && (
        <Box>
          <h2>How To</h2>
          <p>Instructions and tips for volunteering, logging work, and signing up for shifts.</p>
        </Box>
      )}
    </div>
  );
}

export default Volunteer;
