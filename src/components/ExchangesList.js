import React, { Fragment, useContext, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { baseUrl, coinAPIKey } from '../configs/CoinAPI';
import notAvailable from '../assets/notAvailable.jpg';
import AppContext from '../contexts/AppContext';

function ExchangesList({ readOnly }) {

  const { mvTopExchanges, setMvTopExchanges, mvTopExchangesIcons, setMvTopExchangesIcons, selectedExchange, setSelectedExchange } = useContext(AppContext);

  function delay(ms) { return new Promise((resolve) => { setTimeout(resolve, ms) }) };

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
    await delay(1000)
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

  const handleCardClick = (index) => { setSelectedExchange(index) };

  useEffect(() => { fetchExchanges() }, []);
  
  return(
    <Fragment>
      {mvTopExchanges.length === 0 && (
        <Grid item>
          <Container sx={{ height: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <CircularProgress />
          </Container>  
        </Grid>
      )}
      {mvTopExchanges.map((exch, index) => (
        <Grid key={`grid-${index}`} item>
          <Card elevation={3} sx={{ height: 260, width: 160, border: '#1976d2', borderWidth: '3px', borderStyle: index === selectedExchange ? 'solid': 'hidden' }}>
            {readOnly && (
              <Fragment>
                <CardMedia component="img" height="160" src={index < mvTopExchangesIcons.length ? mvTopExchangesIcons[index].url : notAvailable} />
                <CardContent>
                  <Typography variant="h6" textAlign="center">
                    {exch.name ? exch.name : 'Exch. Name'}
                  </Typography>
                  <Typography variant="caption" textAlign="center" component="div" width="160">
                    Website:
                  </Typography> 
                  <Typography variant="caption" textAlign="center" component="div" width="160">
                    { exch.website ? exch.website : 'Website URL' }
                  </Typography>
                </CardContent>
              </Fragment>
            )}
            {!readOnly && (
              <CardActionArea onClick={() => handleCardClick(index)}>
                <CardMedia component="img" height="160" src={index < mvTopExchangesIcons.length ? mvTopExchangesIcons[index].url : notAvailable} />
                <CardContent>
                  <Typography variant="h6" textAlign="center">
                    {exch.name ? exch.name : 'Exch. Name'}
                  </Typography>
                  <Typography variant="caption" textAlign="center" component="div" width="160">
                    Website:
                  </Typography> 
                  <Typography variant="caption" textAlign="center" component="div" width="160">
                    { exch.website ? exch.website : 'Website URL' }
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

export default ExchangesList;