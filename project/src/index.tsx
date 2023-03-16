import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { RentCount } from './data-store/data-const';
import { amsterdam } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      totalNumberOffers={RentCount.totalNumberOffers}
      rentListRoom={amsterdam}
    />
  </React.StrictMode>,
);
