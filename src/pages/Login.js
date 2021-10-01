import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Login() {

  let history = useHistory()
  const cookies = new Cookies();
  
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (event) => { setName(event.target.value) };
  const handleLastNameChange = (event) => { setLastName(event.target.value) };
  
  const handleButtonClick = () => {
    if(name.length > 0 && lastName.length > 0) {
      cookies.set('name', name, { path: '/login' })
      cookies.set('lastName', lastName, { path: '/login' }) 
      console.log( name + ' ' + lastName)
      history.push('/home')
    }
  };

  return(
    <Grid container justifyContent="center">
      <Grid item>
        <Paper elevation={6} sx={{ padding: '30px', width: '320px', height: '420px' }} square>
          <Grid align="center" sx={{ mt: 4 }}>
            <Avatar><LockOutlinedIcon /></Avatar>
            <Typography variant="h5" sx={{ mt: 6 }}>Ingresar al Dashboard</Typography>
          </Grid>
          <TextField value={name} sx={{ mt: 4 }} onChange={handleFirstNameChange} label="Nombre" placeholder="Ingrese su Nombre" fullWidth required />
          <TextField value={lastName} sx={{ mt: 2 }} onChange={handleLastNameChange} label="Apellido" placeholder="Ingrese su Apellido" fullWidth required />
          <Button sx={{ mt: 6 }} onClick={() => handleButtonClick()} variant="contained" fullWidth>
            INGRESAR
          </Button>
        </Paper>
      </Grid>     
    </Grid>
  )
}

export default Login;