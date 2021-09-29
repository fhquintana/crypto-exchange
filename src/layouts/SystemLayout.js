import React from 'react';
import Container from '@mui/material/Container';
import AppBarMenu from '../components/AppBarMenu';
import SideBarMenu from '../components/SideBarMenu';
import { AppContextProvider } from '../contexts/AppContext';

function SystemLayout({ children }) {

  return(
    <AppContextProvider>
      <AppBarMenu />
      <SideBarMenu />
        <Container maxWidth="lg" sx={{ paddingTop: '20px', paddingBottom: '20px' }}>
          { children }
        </Container>
    </AppContextProvider>
  )
}

export default SystemLayout;