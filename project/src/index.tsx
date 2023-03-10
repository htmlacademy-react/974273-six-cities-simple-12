import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { RentCount, amsterdam } from './data-store/data-const';

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
