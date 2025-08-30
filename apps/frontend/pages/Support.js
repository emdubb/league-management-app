import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

const contacts = [
  { name: 'Facilities Manager', email: 'facilities@league.org' },
  { name: 'Conflict Resolution', email: 'conflict@league.org' },
  { name: 'General Support', email: 'support@league.org' },
];

const resources = [
  { name: 'League Handbook', url: 'https://league.org/handbook' },
  { name: 'Volunteer Guide', url: 'https://league.org/volunteer-guide' },
  { name: 'Code of Conduct', url: 'https://league.org/code-of-conduct' },
];

function Support() {
  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', p: 4, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Support</Typography>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" gutterBottom>Report a Facilities Issue</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        If you notice a facilities issue (equipment, rink, etc.), please email <Link href="mailto:facilities@league.org">facilities@league.org</Link> or fill out the <Link href="https://league.org/facilities-report" target="_blank">Facilities Issue Form</Link>.
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" gutterBottom>Conflict Management – Report a People Issue</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        For interpersonal or team conflicts, email <Link href="mailto:conflict@league.org">conflict@league.org</Link> or use the <Link href="https://league.org/conflict-report" target="_blank">Conflict Report Form</Link>.
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" gutterBottom>Contact List</Typography>
      <List>
        {contacts.map((c, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={c.name} secondary={<Link href={`mailto:${c.email}`}>{c.email}</Link>} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ mb: 3 }} />
      <Typography variant="h6" gutterBottom>Resources</Typography>
      <List>
        {resources.map((r, idx) => (
          <ListItem key={idx}>
            <ListItemText primary={<Link href={r.url} target="_blank">{r.name}</Link>} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Support;
