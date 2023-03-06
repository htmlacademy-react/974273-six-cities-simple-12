import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const RentCount = {
  totalNumberOffers: 1324,
} as const;

const amsterdam = [
  {
    price: 3320
  },
  {
    price: 340
  },
  {
    price: 180
  },
  {
    price: 220
  },
  {
    price: 160
  }
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      totalNumberOffers={RentCount.totalNumberOffers}
      rentAmsterdam={amsterdam}
    />
  </React.StrictMode>,
);
