import AssetsList from './AssetsList';
import ExchangesList from './ExchangesList';
import BuyForm from './BuyForm';

const steps = [
  { 
    label: 'Selecciona una Criptomoneda', 
    component: <AssetsList readOnly={false} />
  },
  {
    label: 'Selecciona un Exchange',
    component: <ExchangesList readOnly={false} />
  }, 
  {
    label: 'Ingresa el Monto a comprar',
    component: <BuyForm />
  }
];

export default steps;