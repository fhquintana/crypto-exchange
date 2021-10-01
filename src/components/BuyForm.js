import React, { useContext } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AppContext from '../contexts/AppContext';

function BuyForm() {

  const comArray = [0.25, 0.40, 0.55];
  const numRegex = /^[0-9]*.?[0-9]?[0-9]?$/;

  const { cryptoAmount, setCryptoAmount, selectedExchange, usdRate } = useContext(AppContext);

  const handleInputChange = (event) => { 
    const number = event.target.value
    if(numRegex.test(number) && number.length <= 20) {
      setCryptoAmount(number)
    } 
  };

  return(
    <Grid item>
      <Paper sx={{ height: 260, width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} elevation={0}>
        <TextField label="Cantidad a Comprar" value={cryptoAmount} onChange={handleInputChange} fullWidth />
        <Typography variant="body2" textAlign="center" sx={{ marginTop: '30px' }}>
          Monto Necesario (USD): { selectedExchange !== undefined ? cryptoAmount * (comArray[selectedExchange] / 100 + 1) * usdRate : 0.0 }
        </Typography>
      </Paper>
    </Grid>
  )
}

export default BuyForm;