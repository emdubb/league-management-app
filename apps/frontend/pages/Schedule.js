import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
function DataManagement() {
  // Teams for dropdown
  const teamsList = [
    'Capital Maulstars',
    'Bruin Trouble',
    'Kodiak Attack',
    'Beastie Bears',
  ];

  // Games state
  const [games, setGames] = useState([]);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [gameForm, setGameForm] = useState({
    eventIdx: '',
    startTime: '',
    homeLeague: 'Sacramento Roller Derby',
    homeTeam: teamsList[0],
    awayLeague: '',
    awayTeam: '',
  });
  const [editGameIdx, setEditGameIdx] = useState(null);
  const [deleteGameDialogOpen, setDeleteGameDialogOpen] = useState(false);
  const [deleteGameIdx, setDeleteGameIdx] = useState(null);

  const handleOpenGameModal = (idx = null) => {
    if (idx !== null && games[idx]) {
      setGameForm(games[idx]);
      setEditGameIdx(idx);
    } else {
      setGameForm({
        eventIdx: '',
        startTime: '',
        homeLeague: 'Sacramento Roller Derby',
        homeTeam: teamsList[0],
        awayLeague: '',
        awayTeam: '',
      });
      setEditGameIdx(null);
    }
    setGameModalOpen(true);
  };
  const handleCloseGameModal = () => {
    setGameModalOpen(false);
    setEditGameIdx(null);
  };
  const handleGameFormChange = (e) => {
    const { name, value } = e.target;
    setGameForm(f => ({ ...f, [name]: value }));
  };
  const handleGameSubmit = (e) => {
    e.preventDefault();
    if (editGameIdx !== null) {
      setGames(prev => prev.map((g, idx) => idx === editGameIdx ? gameForm : g));
    } else {
      setGames(prev => [gameForm, ...prev]);
    }
    setGameModalOpen(false);
    setEditGameIdx(null);
  };
  const openDeleteGameDialog = (idx) => {
    setDeleteGameDialogOpen(true);
    setDeleteGameIdx(idx);
  };
  const closeDeleteGameDialog = () => {
    setDeleteGameDialogOpen(false);
    setDeleteGameIdx(null);
  };
  const handleDeleteGame = (idx) => {
    setGames(prev => prev.filter((_, i) => i !== idx));
    setDeleteGameDialogOpen(false);
    setDeleteGameIdx(null);
  };
  // Event state
  const [events, setEvents] = useState([]);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: 'The BearHouse, 1701 Thornton Ave Sacramento, CA 95811',
  });
  const [editEventIdx, setEditEventIdx] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(null);

  const handleOpenEventModal = (idx = null) => {
    if (idx !== null && events[idx]) {
      setEventForm(events[idx]);
      setEditEventIdx(idx);
    } else {
      setEventForm({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: 'The BearHouse, 1701 Thornton Ave Sacramento, CA 95811',
      });
      setEditEventIdx(null);
    }
    setEventModalOpen(true);
  };
  const handleCloseEventModal = () => {
    setEventModalOpen(false);
    setEditEventIdx(null);
  };
  const handleEventFormChange = (e) => {
    const { name, value } = e.target;
    setEventForm(f => ({ ...f, [name]: value }));
  };
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editEventIdx !== null) {
      setEvents(prev => prev.map((ev, idx) => idx === editEventIdx ? eventForm : ev));
    } else {
      setEvents(prev => [eventForm, ...prev]);
    }
    setEventModalOpen(false);
    setEditEventIdx(null);
  };
  const openDeleteDialog = (idx) => {
    setDeleteDialogOpen(true);
    setDeleteIdx(idx);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteIdx(null);
  };
  const handleDeleteEvent = (idx) => {
    setEvents(prev => prev.filter((_, i) => i !== idx));
    setDeleteDialogOpen(false);
    setDeleteIdx(null);
  };
  const [tab, setTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <div style={{ padding: 32 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs value={tab} onChange={handleTabChange} aria-label="data management tabs">
          <Tab label="Events" />
          <Tab label="Games" />
          <Tab label="Practices" />
          <Tab label="Teams" />
          <Tab label="Meetings" />
          <Tab label="Members" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <Box>
          <h2>Events</h2>
          <p>View, import, and manage league events here.</p>
          <Button variant="contained" color="primary" onClick={() => handleOpenEventModal()} sx={{ mb: 2 }}>Add Event</Button>
          <Dialog open={eventModalOpen} onClose={handleCloseEventModal} maxWidth="sm" fullWidth>
            <DialogTitle>{editEventIdx !== null ? 'Edit Event' : 'Add Event'}</DialogTitle>
            <DialogContent>
              <form onSubmit={handleEventSubmit}>
                <TextField name="title" label="Event Title" value={eventForm.title} onChange={handleEventFormChange} fullWidth sx={{ mb: 2 }} required />
                <TextField name="date" label="Date" type="date" value={eventForm.date} onChange={handleEventFormChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} required />
                <TextField name="startTime" label="Start Time" type="time" value={eventForm.startTime} onChange={handleEventFormChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} required />
                <TextField name="endTime" label="End Time (optional)" type="time" value={eventForm.endTime} onChange={handleEventFormChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                <TextField name="location" label="Location" value={eventForm.location} onChange={handleEventFormChange} fullWidth sx={{ mb: 2 }} required />
                <DialogActions>
                  <Button onClick={handleCloseEventModal}>Cancel</Button>
                  <Button type="submit" variant="contained">{editEventIdx !== null ? 'Save Changes' : 'Add Event'}</Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.startTime}</TableCell>
                    <TableCell>{event.endTime || '-'}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => handleOpenEventModal(idx)} size="small"><EditIcon fontSize="small" /></IconButton>
                      <IconButton aria-label="delete" onClick={() => openDeleteDialog(idx)} size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this event?
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteDialog}>Cancel</Button>
              <Button onClick={() => handleDeleteEvent(deleteIdx)} color="error" variant="contained">Delete</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {tab === 1 && (
        <Box>
          <h2>Games</h2>
          <p>View, import, and manage league games here.</p>
          <Button variant="contained" color="primary" onClick={() => handleOpenGameModal()} sx={{ mb: 2 }}>Add Game</Button>
          <Dialog open={gameModalOpen} onClose={handleCloseGameModal} maxWidth="sm" fullWidth>
            <DialogTitle>{editGameIdx !== null ? 'Edit Game' : 'Add Game'}</DialogTitle>
            <DialogContent>
              <form onSubmit={handleGameSubmit}>
                <TextField
                  select
                  name="eventIdx"
                  label="Select Event"
                  value={gameForm.eventIdx}
                  onChange={handleGameFormChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  SelectProps={{ native: true }}
                  required
                >
                  <option value="">Select an event</option>
                  {events && events.map((ev, idx) => (
                    <option key={idx} value={idx}>{ev.title} ({ev.date})</option>
                  ))}
                </TextField>
                <TextField
                  name="startTime"
                  label="Start Time"
                  type="time"
                  value={gameForm.startTime}
                  onChange={handleGameFormChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  required
                  inputProps={{
                    min: gameForm.eventIdx !== '' && events && events[gameForm.eventIdx] ? events[gameForm.eventIdx].startTime : undefined
                  }}
                  disabled={gameForm.eventIdx === ''}
                />
                <TextField
                  name="homeLeague"
                  label="Home League"
                  value={gameForm.homeLeague}
                  onChange={handleGameFormChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  select
                  name="homeTeam"
                  label="Home Team"
                  value={gameForm.homeTeam}
                  onChange={handleGameFormChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  SelectProps={{ native: true }}
                  required
                >
                  {teamsList.map((team, idx) => (
                    <option key={idx} value={team}>{team}</option>
                  ))}
                </TextField>
                <TextField
                  name="awayLeague"
                  label="Away League"
                  value={gameForm.awayLeague}
                  onChange={handleGameFormChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  name="awayTeam"
                  label="Away Team"
                  value={gameForm.awayTeam}
                  onChange={handleGameFormChange}
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                <DialogActions>
                  <Button onClick={handleCloseGameModal}>Cancel</Button>
                  <Button type="submit" variant="contained">{editGameIdx !== null ? 'Save Changes' : 'Add Game'}</Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>Home League</TableCell>
                  <TableCell>Home Team</TableCell>
                  <TableCell>Away League</TableCell>
                  <TableCell>Away Team</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {games.map((game, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{game.eventIdx !== '' && events && events[game.eventIdx] ? events[game.eventIdx].title : ''}</TableCell>
                    <TableCell>{game.startTime}</TableCell>
                    <TableCell>{game.homeLeague}</TableCell>
                    <TableCell>{game.homeTeam}</TableCell>
                    <TableCell>{game.awayLeague}</TableCell>
                    <TableCell>{game.awayTeam}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => handleOpenGameModal(idx)} size="small"><EditIcon fontSize="small" /></IconButton>
                      <IconButton aria-label="delete" onClick={() => openDeleteGameDialog(idx)} size="small"><DeleteIcon fontSize="small" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog open={deleteGameDialogOpen} onClose={closeDeleteGameDialog}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this game?
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDeleteGameDialog}>Cancel</Button>
              <Button onClick={() => handleDeleteGame(deleteGameIdx)} color="error" variant="contained">Delete</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {tab === 2 && (
        <Box>
          <h2>Practices</h2>
          <p>View, import, and manage league practices here.</p>
        </Box>
      )}
      {tab === 3 && (
        <Box>
          <h2>Teams</h2>
          <p>Manage league teams here. (Coming soon)</p>
          <ul>
            {teamsList.map(team => <li key={team}>{team}</li>)}
          </ul>
        </Box>
      )}
      {tab === 4 && (
        <Box>
          <h2>Meetings</h2>
          <p>View, import, and manage league meetings here.</p>
        </Box>
      )}
      {tab === 5 && (
        <Box>
          <h2>Members</h2>
          <p>View, import, and manage league members here.</p>
        </Box>
      )}
    </div>
  );
}

export default DataManagement;
