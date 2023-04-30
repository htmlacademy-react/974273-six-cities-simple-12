import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../data-store/data-variables';
import { commentsAction, fetchHotelAction, fetchHotelsAction } from '../api-actions';
import { DataProcess } from '../../types/state';
import { Offers } from '../../types/type-store';
import { sortByMax, sortByMin } from '../../utils/utils';
import { OPTIONS_SORTING, SORT_NAME } from '../../data-store/data-const';

const selectCity = (offers: Offers, city: string): Offers => (offers.filter((offer) => offer.city.name === city).slice());

const initialState: DataProcess = {
  isHotelsDataLoading: false,
  isHotelDataLoading: false,
  offers: [],
  city: 'Paris',
  sortName: SORT_NAME,
  offersCity: [],
  isOpenSort: false,
  error: null,
  offer: null,
  comments: [],
  offersNearby: [],
  isSendingComment: false,
  clearingForm: true,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    chooseCity: (state, action: PayloadAction<{ cityName: string }>) => {

      const { cityName } = action.payload;

      state.city = cityName;
      state.offersCity = selectCity(state.offers, state.city);
      state.sortName = SORT_NAME;
      state.isOpenSort = false;
    },
    chooseOption: (state, action: PayloadAction<{ nameOption: string }>) => {

      const { nameOption } = action.payload;
      const sortIndex = OPTIONS_SORTING.findIndex((optionSorting) => optionSorting.includes(nameOption));

      state.sortName = nameOption;


      if (sortIndex === 0) {
        state.offersCity = selectCity(state.offers, state.city);
      } else {
        switch (sortIndex) {
          case 1:
            state.offersCity = state.offersCity.sort((a, b) => sortByMax(a.price, b.price));
            break;
          case 2:
            state.offersCity = state.offersCity.sort((a, b) => sortByMin(a.price, b.price));
            break;
          case 3:
            state.offersCity = state.offersCity.sort((a, b) => sortByMin(a.rating, b.rating));
            break;
        }
      }
    },
    isOpenSort: (state) => {
      state.isOpenSort = !state.isOpenSort;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearErrorAction: (state) => {
      state.error = null;
    },
    clearingFormAction: (state) => {
      state.clearingForm = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchHotelsAction.pending, (state) => {
        state.isHotelsDataLoading = true;
      })
      .addCase(fetchHotelsAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.offersCity = selectCity(state.offers, state.city);
        state.isHotelsDataLoading = false;
      })
      .addCase(fetchHotelsAction.rejected, (state) => {
        state.isHotelsDataLoading = false;
      })
      .addCase(fetchHotelAction.pending, (state) => {
        state.isHotelDataLoading = true;
      })
      .addCase(fetchHotelAction.fulfilled, (state, action) => {
        const offerDatas = action.payload;
        state.offer = offerDatas[0];
        state.comments = offerDatas[1];
        state.offersNearby = offerDatas[2];
        state.isHotelDataLoading = false;
      })
      .addCase(fetchHotelAction.rejected, (state) => {
        state.isHotelDataLoading = false;
      })
      .addCase(commentsAction.pending, (state) => {
        state.isSendingComment = true;
      })
      .addCase(commentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isSendingComment = false;
        state.clearingForm = false;
      })
      .addCase(commentsAction.rejected, (state) => {
        state.isSendingComment = false;
      });
  },
});

export const { chooseCity, chooseOption, isOpenSort, setError, clearErrorAction, clearingFormAction } = dataProcess.actions;
