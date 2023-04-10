import { createReducer } from '@reduxjs/toolkit';
import { chooseCity, chooseOption, isOpenSort, changeColorMarker, loadOffers, setHotelsDataLoadingStatus, requireAuthorization, setError } from './actions';
import { AuthorizationStatus, RentSort } from '../data-store/data-variables';
import { MARKER_OUT } from '../data-store/data-const';
import { sortByMax, sortByMin } from '../utils/utils';
import { Offers } from '../types/type-store';

const selectCity = (offers: Offers, city: string) => (offers.filter((offer) => offer.city.name === city).slice());
const SORT_NAME = 'Popular';

type InitialState = {
  city: string;
  offersCity: Offers;
  sortName: string;
  isOpenSort: boolean;
  markerColor: number;
  offers: Offers;
  isHotelsDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitialState = {
  city: 'Paris',
  offersCity: [],
  sortName: SORT_NAME,
  isOpenSort: false,
  markerColor: MARKER_OUT,
  offers: [],
  isHotelsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      const { cityName } = action.payload;
      state.city = cityName;
      state.offersCity = selectCity(state.offers, state.city);
      state.sortName = SORT_NAME;
      state.isOpenSort = false;
    })
    .addCase(chooseOption, (state, action) => {
      const { nameOption } = action.payload;
      state.sortName = nameOption;
      if (nameOption === SORT_NAME) {
        state.offersCity = selectCity(state.offers, state.city);
      } else {
        switch (nameOption) {
          case RentSort.PriceMax:
            state.offersCity = state.offersCity.sort((a, b) => sortByMax(a.price, b.price));
            break;
          case RentSort.PriceMin:
            state.offersCity = state.offersCity.sort((a, b) => sortByMin(a.price, b.price));
            break;
          case RentSort.RatingMax:
            state.offersCity = state.offersCity.sort((a, b) => sortByMin(a.rating, b.rating));
            break;
        }
      }
    })
    .addCase(isOpenSort, (state) => {
      state.isOpenSort = !state.isOpenSort;
    })
    .addCase(changeColorMarker, (state, action) => {
      const { markerId } = action.payload;
      state.markerColor = markerId;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.offersCity = selectCity(state.offers, state.city);
    })
    .addCase(setHotelsDataLoadingStatus, (state, action) => {
      state.isHotelsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
