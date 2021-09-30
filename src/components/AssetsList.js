import React, { Fragment, useContext, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { baseUrl, coinAPIKey } from '../configs/CoinAPI';
import notAvailable from '../assets/notAvailable.jpg';
import AppContext from '../contexts/AppContext';

function AssetsList({ readOnly }) {

  const { mvTopAssets, setMvTopAssets, mvTopAssetsIcons, setMvTopAssetsIcons, selectedAsset, setSelectedAsset } = useContext(AppContext);

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

  const handleCardClick = (index) => { setSelectedAsset(index) };

  useEffect(() => { fetchAssets() }, []);

  return(
    <Fragment>
      {mvTopAssets.length === 0 && (
        <Grid item>
          <CircularProgress sx={{ marginTop: '20px' }} />  
        </Grid>
      )}
      {mvTopAssets.map((coin, index) => (
        <Grid key={`grid-${index}`} item>
          <Card elevation={3} sx={{ height: 260, width: 160, border: '#1976d2', borderWidth: '3px', borderStyle: index === selectedAsset ? 'solid': 'hidden' }}>
            {readOnly && (
              <Fragment>
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
              </Fragment>
            )}
            {!readOnly && (
              <CardActionArea onClick={() => handleCardClick(index)}>
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
              </CardActionArea>
            )}
          </Card>
        </Grid>
      ))}
    </Fragment>
  )
}

export default AssetsList;