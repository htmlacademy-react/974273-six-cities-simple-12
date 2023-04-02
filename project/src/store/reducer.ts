import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { chooseCity } from './actions';

const DATA_OFFERS_PARIS = offers.filter((offer) => offer.city.name === 'Paris');

const initialState = {
  city: 'Paris',
  offers: DATA_OFFERS_PARIS,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      const { cityName } = action.payload;
      state.city = cityName;
      state.offers = offers.filter((offer) => offer.city.name === cityName);
    });
});
