import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { baseUrl, coinAPIKey } from '../configs/CoinAPI';
import AppContext from '../contexts/AppContext';
import notAvailable from '../assets/notAvailable.jpg';

function Home() {

  const { mvTopAssets, setMvTopAssets, mvTopAssetsIcons, setMvTopAssetsIcons } = useContext(AppContext);
  const { mvTopExchanges, setMvTopExchanges, mvTopExchangesIcons, setMvTopExchangesIcons } = useContext(AppContext);

  function delay(ms) { return new Promise((resolve) => { setTimeout(resolve, ms) }) };

  const fetchAssetsIcons = async (selectedCoins) => {
    await delay(100)
    await axios.get(baseUrl + "assets/icons/small", { headers: {"X-CoinAPI-Key": coinAPIKey} })
      .then((response) => { 
        let selectedIds = []
        selectedCoins.forEach(coin => selectedIds.push(coin.asset_id))
        const fetchResult = response.data.filter(coin => selectedIds.includes(coin.asset_id))
        setMvTopAssetsIcons(fetchResult)
        console.log(fetchResult) 
      })
      .catch((error) => { console.log(error) })
  };

  const fetchAssets = async () => {
    await axios.get(baseUrl + "assets", { headers: {"X-CoinAPI-Key": coinAPIKey} })
      .then((response) => { 
        const fetchResult = response.data.filter(coin => coin.type_is_crypto === 1).sort((coina, coinb) => coinb.volume_1mth_usd - coina.volume_1mth_usd).slice(0, 5)
        setMvTopAssets(fetchResult)
        fetchAssetsIcons(fetchResult)
        console.log(fetchResult) 
      })
      .catch((error) => {
        setMvTopAssets([{}]) 
        console.log(error) 
      })
  };

  const fetchExchangesIcons = async (selectedExch) => {
    await delay(100)
    await axios.get(baseUrl + "exchanges/icons/small", { headers: {"X-CoinAPI-Key": coinAPIKey} })
      .then((response) => { 
        let selectedIds = []
        selectedExch.forEach(exch => selectedIds.push(exch.exchange_id))
        const fetchResult = response.data.filter(exch => selectedIds.includes(exch.exchange_id))
        setMvTopExchangesIcons(fetchResult)
        console.log(fetchResult) 
      })
      .catch((error) => { console.log(error) })
  };

  const fetchExchanges = async () => {
    await delay(500)
    await axios.get(baseUrl + "exchanges", { headers: {"X-CoinAPI-Key": coinAPIKey} })
      .then((response) => { 
        const fetchResult = response.data.sort((excha, exchb) => exchb.volume_1mth_usd - excha.volume_1mth_usd).slice(0, 3)
        setMvTopExchanges(fetchResult)
        fetchExchangesIcons(fetchResult)
        console.log(fetchResult)
      })
      .catch((error) => { 
        setMvTopExchanges([{}])
        console.log(error) 
      })
  };

  useEffect(() => { 
    fetchAssets()
    fetchExchanges()
  }, []);

  return(
    <Grid container justifyContent="center" spacing={2}>
      <Grid xs={12} item>
        <Typography variant="subtitle1" textAlign="center" sx={{ marginTop: '20px'}} gutterBottom>
          Criptomonedas con Mayor Volumen Mensual Manejado (USD)
        </Typography>
      </Grid>
      {mvTopAssets.length === 0 && (
        <Box sx={{ display: 'inline-flex' }}>
          <CircularProgress sx={{ marginTop: '20px' }} />  
        </Box>
      )}
      {mvTopAssets.map((coin, index) => (
        <Grid key={`grid-${index}`} item>
          <Card sx={{ height: 260, width: 160 }}>
            <CardMedia component="img" height="160" src={index < mvTopAssetsIcons.length ? mvTopAssetsIcons[index].url : notAvailable} />
            <CardContent>
              <Typography variant="h6" textAlign="center">
                {coin.name ? coin.name : 'Coin Name'}
              </Typography>
              <Typography variant="caption" textAlign="center" component="div" width="160">
                Precio (USD):
              </Typography> 
              <Typography variant="caption" textAlign="center" component="div" width="160">
                { coin.price_usd ? coin.price_usd.toFixed(4) : '00.00' }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid xs={12} item>
        <Typography variant="subtitle1" textAlign="center" sx={{ marginTop: '30px'}} gutterBottom>
          Exchanges con Mayor Volumen Mensual Operado (USD)
        </Typography>
      </Grid>
      {mvTopExchanges.length === 0 && (
        <Box sx={{ display: 'inline-flex' }}>
          <CircularProgress sx={{ marginTop: '20px' }} />  
        </Box>
      )}
      {mvTopExchanges.map((exch, index) => (
        <Grid key={`grid-${index}`} item>
          <Card sx={{ height: 260, width: 160 }}>
            <CardMedia component="img" height="160" src={index < mvTopExchangesIcons.length ? mvTopExchangesIcons[index].url : notAvailable} />
            <CardContent>
              <Typography variant="h6" textAlign="center">
                {exch.name ? exch.name : 'Exchange Name'}
              </Typography>
              <Typography variant="caption" textAlign="center" component="div" width="160">
                Website:
              </Typography> 
              <Typography variant="caption" textAlign="center" component="div" width="160">
                { exch.website ? exch.website : 'Website URL' }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Home;