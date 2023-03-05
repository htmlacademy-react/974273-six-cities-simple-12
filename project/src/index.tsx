import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const RentCount = {
  totalNumberOffers: 1324,
} as const;

const amsterdam = [
  {
    prace: 3320
  },
  {
    prace: 340
  },
  {
    prace: 180
  },
  {
    prace: 220
  },
  {
    prace: 160
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
