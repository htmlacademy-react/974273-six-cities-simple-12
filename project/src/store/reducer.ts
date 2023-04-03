import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { chooseCity, chooseOption, isOpenSort } from './actions';
import { RentSort } from '../data-store/data-variables';
import { sortByMax, sortByMin } from '../utils/utils';

const DATA_OFFERS_PARIS = offers.filter((offer) => offer.city.name === 'Paris').slice();
const SORT_NAME = 'Popular';

const initialState = {
  city: 'Paris',
  offers: DATA_OFFERS_PARIS,
  sortName: SORT_NAME,
  isOpenSort: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      const { cityName } = action.payload;
      state.city = cityName;
      state.offers = offers.filter((offer) => offer.city.name === cityName).slice();
      state.sortName = SORT_NAME;
      state.isOpenSort = false;
    })
    .addCase(chooseOption, (state, action) => {
      const { nameOption } = action.payload;
      state.sortName = nameOption;
      if (nameOption === SORT_NAME) {
        state.offers = offers.filter((offer) => offer.city.name === state.city).slice();
      } else {
        switch (nameOption) {
          case RentSort.PriceMax:
            state.offers = state.offers.sort((a, b) => sortByMax(a.price, b.price));
            break;
          case RentSort.PriceMin:
            state.offers = state.offers.sort((a, b) => sortByMin(a.price, b.price));
            break;
          case RentSort.RatingMax:
            state.offers = state.offers.sort((a, b) => sortByMin(a.rating, b.rating));
            break;
        }
      }
    })
    .addCase(isOpenSort, (state) => {
      state.isOpenSort = !state.isOpenSort;
    });
});
