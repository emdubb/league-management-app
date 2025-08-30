
import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Custom primary color
    },
    secondary: {
      main: '#ff9800', // Custom secondary color
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 700,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div style={{ marginTop: 80 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

// Styles removed; use CSS or MUI for styling if needed
