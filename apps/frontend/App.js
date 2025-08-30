
import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Volunteer from './pages/Volunteer';
import DataManagement from './pages/Schedule';
import Profile from './pages/Profile';
import Support from './pages/Support';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SignedUpGamesProvider } from './SignedUpGamesContext';

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
      <SignedUpGamesProvider>
        <Router>
          <NavBar />
          <div style={{ marginTop: 80 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/data" element={<DataManagement />} />
              <Route path="/schedule" element={<DataManagement />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </div>
        </Router>
      </SignedUpGamesProvider>
    </ThemeProvider>
  );
}

// Styles removed; use CSS or MUI for styling if needed
