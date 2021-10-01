import React, { useState } from 'react';

const AppContext = React.createContext({});

export function AppContextProvider({ children }) {

  const [sbOpen, setSbOpen] = useState(false);
  const [mvTopAssets, setMvTopAssets] = useState([]);
  const [mvTopAssetsIcons, setMvTopAssetsIcons] = useState([]);
  const [mvTopExchanges, setMvTopExchanges] = useState([]);
  const [mvTopExchangesIcons, setMvTopExchangesIcons] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState();
  const [selectedExchange, setSelectedExchange] = useState();
  const [usdRate, setUsdRate] = useState(0.0);
  const [cryptoAmount, setCryptoAmount] = useState(0.0);

  const state = {
    sbOpen, setSbOpen,
    mvTopAssets, setMvTopAssets,
    mvTopAssetsIcons, setMvTopAssetsIcons,
    mvTopExchanges, setMvTopExchanges,
    mvTopExchangesIcons, setMvTopExchangesIcons,
    selectedAsset, setSelectedAsset,
    selectedExchange, setSelectedExchange,
    usdRate, setUsdRate,
    cryptoAmount, setCryptoAmount
  };

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext;