import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import steps from '../components/StepsList';

function Exchange() {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1) };
  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
  const handleReset = () => { setActiveStep(0) };

  return(
    <Grid container justifyContent="center" rowSpacing={2} columnSpacing={4}>
      <Grid xs={12} item>
        <Typography variant="subtitle1" textAlign="center" gutterBottom>
          Compra de Criptomonedas
        </Typography>
      </Grid>
      <Grid xs={12} item>
        <Stepper activeStep={activeStep} sx={{ marginTop: '10px' }}>
          {steps.map((step, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={`step-${index}`} {...stepProps}>
                <StepLabel sx={{ fontSize: '0.75rem' }} {...labelProps}>{step.label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      {steps[activeStep].component}
      <Grid xs={12} justifyContent="center" display="inline-flex" item>
        <Typography variant="body2" textAlign="center">
          Criptomoneda: 
        </Typography>
        <Typography variant="body2" textAlign="center">
          Rate (USD): 
        </Typography>
        <Typography variant="body2" textAlign="center">
          Fecha y Hora: 
        </Typography>
      </Grid>
      <Grid xs={12} justifyContent="center" display="inline-flex" item>
        <Typography variant="body2" textAlign="center">
          Exchange: 
        </Typography>
        <Typography variant="body2" textAlign="center">
          Comisión (%): 
        </Typography>
      </Grid>
      <Grid xs={12} justifyContent="center" display="inline-flex" item>
        <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ width: '120px', mr: 4 }}>
          ATRAS
        </Button>
        <Button variant="contained" onClick={handleNext} sx={{ width: '120px' }}>
          {activeStep === steps.length - 1 ? 'COMPRAR' : 'SIGUIENTE'}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Exchange;