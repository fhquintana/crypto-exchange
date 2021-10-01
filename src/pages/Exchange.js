import React, { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import steps from '../components/StepsList';
import AppContext from '../contexts/AppContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Exchange() {

  const comArray = [0.25, 0.40, 0.55];

  const { mvTopAssets, mvTopExchanges, usdRate, selectedAsset, selectedExchange, cryptoAmount } = useContext(AppContext);

  const [activeStep, setActiveStep] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [ssnackOpen, setSSnackOpen] = useState(false);
  const [csnackOpen, setCSnackOpen] = useState(false);

  const handleDialogOpen = () => { setDialogOpen(true) };
  const handleDialogClose = () => { setDialogOpen(false) };
  const handleSSnackOpen = () => { setSSnackOpen(true) };
  const handleSSnackClose = () => { setSSnackOpen(false) };
  const handleCSnackOpen = () => { setCSnackOpen(true) };
  const handleCSnackClose = () => { setCSnackOpen(false) };

  const handleNext = () => { 
    if(activeStep < 2) { setActiveStep((prevActiveStep) => prevActiveStep + 1) }
    else { handleDialogOpen() }
  };

  const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1) };
  const handleReset = () => { setActiveStep(0) };

  const isNextDisabled = () => {
    switch(activeStep) {
      case(0): return selectedAsset !== undefined ? false : true;
      case(1): return selectedExchange !== undefined ? false : true;
      case(2): return cryptoAmount > 0 ? false : true;
      default: return false;
    }
  };

  const handleCancelClick = () => { handleDialogClose(); handleCSnackOpen(); handleReset() };
  const handleConfirmClick = () => { handleDialogClose(); handleSSnackOpen(); handleReset() };

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
        <Typography variant="body2" textAlign="center" sx={{ mr: 4 }} >
          Criptomoneda: {selectedAsset !== undefined ? mvTopAssets[selectedAsset].asset_id : ''}
        </Typography>
        <Typography variant="body2" textAlign="center">
          Rate (USD): {selectedAsset !== undefined ? usdRate : 0.0}
        </Typography>
      </Grid>
      <Grid xs={12} justifyContent="center" display="inline-flex" item>
        <Typography variant="body2" textAlign="center" sx={{ mr: 4 }}>
          Exchange: {selectedExchange !== undefined ? mvTopExchanges[selectedExchange].name : ''}
        </Typography>
        <Typography variant="body2" textAlign="center">
          Comisión (%): {selectedExchange !== undefined ? comArray[selectedExchange] : 0.0 }
        </Typography>
      </Grid>
      <Grid xs={12} justifyContent="center" display="inline-flex" item>
        <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ width: '120px', mr: 4 }}>
          ATRAS
        </Button>
        <Button variant="contained" onClick={handleNext} disabled={isNextDisabled()} sx={{ width: '120px' }}>
          {activeStep === steps.length - 1 ? 'COMPRAR' : 'SIGUIENTE'}
        </Button>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            Confirmación de la Compra
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
              Criptomoneda: {selectedAsset !== undefined ? mvTopAssets[selectedAsset].asset_id : ''}
            </Typography>
            <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
              Rate (USD): {usdRate}
            </Typography>
            <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
              Exchange: {selectedExchange !== undefined ? mvTopExchanges[selectedExchange].name : ''}
            </Typography>
            <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
              Comisión (%): {selectedExchange !== undefined ? comArray[selectedExchange] : 0.0}
            </Typography>
            <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
              Monto Necesario (USD): {selectedExchange !== undefined ? cryptoAmount * (comArray[selectedExchange] / 100 + 1) * usdRate : 0.0}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCancelClick} sx={{ mr: 2 }}>
              CANCELAR
            </Button>
            <Button variant="contained" onClick={handleConfirmClick} autoFocus>
              CONFIRMAR
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={ssnackOpen} autoHideDuration={6000} onClose={handleSSnackClose}>
          <Alert onClose={handleSSnackClose} severity="success" sx={{ width: '100%' }}>
            Compra Realizada
          </Alert>
        </Snackbar>
        <Snackbar open={csnackOpen} autoHideDuration={6000} onClose={handleCSnackClose}>
          <Alert onClose={handleCSnackClose} severity="error" sx={{ width: '100%' }}>
            Compra Cancelada
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  )
}

export default Exchange;