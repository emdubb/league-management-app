import React from 'react';
import { events } from '../data/events';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
const eventTypeIcon = {
  practice: <SportsSoccerIcon sx={{ color: '#1976d2' }} />,
  meeting: <GroupIcon sx={{ color: '#ff9800' }} />,
  game: <EventIcon sx={{ color: '#d32f2f' }} />,
};

const eventTypeColor = {
  practice: '#e3f2fd',
  meeting: '#fff3e0',
  game: '#ffebee',
};

export default function Home() {
  return (
    <div style={{ padding: 32 }}>
      <h2>My Events</h2>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        {events.map((event, idx) => (
          <Card key={idx} sx={{ background: eventTypeColor[event.type], display: 'flex', alignItems: 'center', minWidth: 320 }}>
            <div style={{ padding: 16 }}>{eventTypeIcon[event.type]}</div>
            <CardContent>
              <Typography variant="h6">{event.name}</Typography>
              <Typography variant="body2">{event.date} &bull; {event.time}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
// ...existing code...
