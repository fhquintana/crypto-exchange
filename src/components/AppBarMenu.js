import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppContext from '../contexts/AppContext';

function AppBarMenu() {

  const { setSbOpen } = useContext(AppContext);

  const handleMenuButtonClick = () => { setSbOpen(true) };

  return(
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton onClick={handleMenuButtonClick} size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CRYPTO EXCHANGE
        </Typography>
        <IconButton size="large" color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarMenu;