import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { baseUrl, coinAPIKey } from '../configs/CoinAPI';
import AppContext from '../contexts/AppContext';

const prueba = [{id:1,valor:'uno'},{id:2,valor:'dos'},{id:3,valor:'tres'},{id:4,valor:'cuatro'}]

function Home() {

  const { setMvTopAssets, setMvTopAssetsIcons } = useContext(AppContext);

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
      .catch((error) => { console.log(error) })
  };

  useEffect(() => { 
    //fetchAssets()
  }, []);

  return(
    <Grid container justifyContent="center" spacing={1}>
      {prueba.map((value) => (
        <Grid key={value.id} item>
          <Card sx={{ height: 140, width: 100 }} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Home;