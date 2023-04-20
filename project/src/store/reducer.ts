import { createReducer } from '@reduxjs/toolkit';
import { chooseCity, chooseOption, isOpenSort, changeColorMarker, loadOffers, setHotelsDataLoadingStatus, requireAuthorization, setError, responseAuthorization, loadOffer, loadOffersNearby, loadComments, setStatusSendingComment, setHotelDataLoadingStatus, checkAuthActionLoadingStatus } from './actions';
import { AuthorizationStatus, RentSort } from '../data-store/data-variables';
import { MARKER_OUT } from '../data-store/data-const';
import { sortByMax, sortByMin } from '../utils/utils';
import { Offers, Offer, ResponseAuthorization, Comments } from '../types/type-store';

const selectCity = (offers: Offers, city: string) => (offers.filter((offer) => offer.city.name === city).slice());
const SORT_NAME = 'Popular';

type InitialState = {
  city: string;
  offersCity: Offers;
  offersNearby: Offers;
  comments: Comments;
  sortName: string;
  isOpenSort: boolean;
  markerColor: number;
  offers: Offers;
  offer: Offer | null;
  isHotelsDataLoading: boolean;
  isHotelDataLoading: boolean;
  isCheckAuthActionLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userAuthorization: ResponseAuthorization;
  isSendingComment: boolean;
}

const initialState: InitialState = {
  city: 'Paris',
  offersCity: [],
  offersNearby: [],
  comments: [],
  sortName: SORT_NAME,
  isOpenSort: false,
  markerColor: MARKER_OUT,
  offers: [],
  offer: null,
  isHotelsDataLoading: false,
  isHotelDataLoading: false,
  isCheckAuthActionLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  userAuthorization: {
    avatarUrl: '',
    email: '',
    id: 1,
    isPro: false,
    name: '',
    token: '',
  },
  isSendingComment: true,
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setHotelsDataLoadingStatus, (state, action) => {
      state.isHotelsDataLoading = action.payload;
    })
    .addCase(setHotelDataLoadingStatus, (state, action) => {
      state.isHotelDataLoading = action.payload;
    })
    .addCase(checkAuthActionLoadingStatus, (state, action) => {
      state.isCheckAuthActionLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(responseAuthorization, (state, action) => {
      state.userAuthorization = action.payload;
    })
    .addCase(setStatusSendingComment, (state, action) => {
      state.isSendingComment = action.payload;
    });
});
