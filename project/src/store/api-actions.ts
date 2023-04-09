import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/type-store';
import { APIRoute } from '../data-store/data-variables';
import { loadOffers, setHotelsDataLoadingStatus } from './actions';

export const fetchHotelsAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setHotelsDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Hotels);
    dispatch(setHotelsDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);
