import React, { useState } from 'react';
// ...existing code...
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import EventIcon from '@mui/icons-material/Event';
import { initialActivities } from '../data/activities';
import { games } from '../data/games';
const gameCardColor = '#ffebee';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

function Volunteer() {
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
  const gameShifts = activities.filter(a => a.type === 'Shift').length;

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
        <Box>
          <h2>Activity</h2>
          <h3>Status</h3>
          <p><strong>Hours this month:</strong> {totalHours}</p>
          <p><strong>Game shifts this quarter:</strong> {gameShifts}</p>
          <hr style={{ margin: '24px 0' }} />
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
              <Card key={idx} sx={{ background: gameCardColor, display: 'flex', alignItems: 'center', minWidth: 320 }}>
                <div style={{ padding: 16 }}><EventIcon sx={{ color: '#d32f2f' }} /></div>
                <CardContent>
                  <Typography variant="h6">{game.name}</Typography>
                  <Typography variant="body2">{game.date} &bull; {game.time}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
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
