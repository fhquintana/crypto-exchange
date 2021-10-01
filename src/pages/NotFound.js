import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import pageNotFound from '../assets/pageNotFound.png';

function NotFound({ history }) {

  const handleBackButtonClick = () => { history.push('/login') }
    
  return(
    <Grid container justifyContent="center">
      <Card sx={{ paddingBottom: '20px' }}>
        <CardMedia component="img" src={pageNotFound} />
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleBackButtonClick}>VOLVER</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default NotFound;