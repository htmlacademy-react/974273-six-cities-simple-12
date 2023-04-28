import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { AppDispatch, State } from '../types/state';
import { Comments, Offer, OfferDatas, Offers, ResponseAuthorization } from '../types/type-store';
import { APIRoute } from '../data-store/data-variables';
import { AuthData } from '../types/auth-data';
import { RatingData } from '../types/rating-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { UserCommentData } from '../types/user-comment-data';

export const fetchHotelsAction = createAsyncThunk<Offers, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotels',
  async (_, { extra: api }) => {
    const { data } = await api.get<Offers>('/hotels');
    return data;
  },
);

export const fetchHotelAction = createAsyncThunk<OfferDatas, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotel',
  async (arg, { extra: api }) => {
    const offerDatas = await Promise.all([
      api.get<Offer>(`/hotels/${arg}`),
      api.get<Comments>(`/comments/${arg}`),
      api.get<Offers>(`/hotels/${arg}/nearby`)
    ]);
    return [offerDatas[0].data, offerDatas[1].data, offerDatas[2].data];
  }
);

export const checkAuthAction = createAsyncThunk<ResponseAuthorization, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/checkAuth',
  async (_, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<ResponseAuthorization, AuthData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const commentsAction = createAsyncThunk<UserCommentData, RatingData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/comments',
  async ({ id, comment, rating }, { extra: api }) => {
    const { data } = await api.post<UserCommentData>(`${APIRoute.Comments}${id}`, { comment, rating });
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/logout',
  async (_, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
