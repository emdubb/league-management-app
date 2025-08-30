import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', left: 0, top: 0, borderRadius: 0 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sacramento Roller Derby
        </Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/volunteer">Volunteer</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/data">Data Management</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/support">Support</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
