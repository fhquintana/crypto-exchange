import React from 'react';
import Container from '@mui/material/Container';

function PublicLayout({ children }) {

  return(
    <Container maxWidth="lg" sx={{ padding: '60px 120px !important' }}>
      { children }
    </Container>
  )
}

export default PublicLayout;