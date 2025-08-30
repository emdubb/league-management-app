import React from 'react';
import { useContext } from 'react';
import { SignedUpGamesContext } from '../SignedUpGamesContext';
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
  const { signedUpGames } = useContext(SignedUpGamesContext);
  return (
    <div style={{ padding: 32 }}>
      <h2>My Events</h2>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        {/* Show default events (practice, meeting, etc.) */}
        {events.filter(e => e.type !== 'game').map((event, idx) => (
          <Card key={idx} sx={{ background: eventTypeColor[event.type], display: 'flex', alignItems: 'center', minWidth: 320 }}>
            <div style={{ padding: 16 }}>{eventTypeIcon[event.type]}</div>
            <CardContent>
              <Typography variant="h6">{event.name}</Typography>
              <Typography variant="body2">{event.date} &bull; {event.time}</Typography>
            </CardContent>
          </Card>
        ))}
        {/* Show signed-up game shifts */}
        {signedUpGames.map((event, idx) => {
          // Parse type and role from title
          const parts = event.title.split(' - ');
          const gameName = parts[0];
          const shiftType = parts[1] || '';
          const shiftRole = parts[2] || '';
          // Extract name from description if present
          let forName = '';
          const match = event.description.match(/Role for ([^\.]+)\./);
          if (match && match[1] && match[1] !== 'yourself') {
            forName = match[1];
          }
          return (
            <Card key={`game-${idx}`} sx={{ background: eventTypeColor['game'], display: 'flex', alignItems: 'center', minWidth: 320 }}>
              <div style={{ padding: 16 }}>{eventTypeIcon['game']}</div>
              <CardContent>
                <Typography variant="h6">{gameName}</Typography>
                <Typography variant="body2">{event.date}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#1976d2', marginTop: 1 }}>{shiftType} — {shiftRole}</Typography>
                {forName && (
                  <Typography variant="body2" sx={{ color: '#333', marginTop: 1 }}>For: {forName}</Typography>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </div>
  );
}
// ...existing code...
