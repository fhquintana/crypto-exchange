import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AssetsList from '../components/AssetsList';
import ExchangesList from '../components/ExchangesList';

function Home() {

  return(
    <Grid container justifyContent="center" spacing={2}>
      <Grid xs={12} item>
        <Typography variant="subtitle1" textAlign="center" sx={{ marginTop: '10px'}} gutterBottom>
          Criptomonedas con Mayor Volumen Mensual Manejado (USD)
        </Typography>
      </Grid>
      <AssetsList readOnly={true} />
      <Grid xs={12} item>
        <Typography variant="subtitle1" textAlign="center" sx={{ marginTop: '20px'}} gutterBottom>
          Exchanges con Mayor Volumen Mensual Operado (USD)
        </Typography>
      </Grid>
      <ExchangesList readOnly={true} />
    </Grid>
  )
}

export default Home;