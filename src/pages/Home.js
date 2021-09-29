import React, { useEffect } from 'react';
import axios from 'axios';
import { baseUrl, coinAPIKey } from '../configs/CoinAPI';

function Home() {

    

    const fetchData = async () => {
        await axios.get(baseUrl + "assets", { headers: {"X-CoinAPI-Key": coinAPIKey} })
            .then((response) => { 
                const mvTopAssets = response.data.filter(coin => coin.type_is_crypto === 1)
                .sort((coina, coinb) => coinb.volume_1mth_usd - coina.volume_1mth_usd).slice(0, 5)
                console.log(mvTopAssets) 
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => { fetchData(); }, []);

    return(
        <div>HOME</div>
    )
}

export default Home;