import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Comments, Offer, OfferDatas, Offers, ResponseAuthorization } from '../types/type-store';
import { APIRoute } from '../data-store/data-variables';
import { AuthData } from '../types/auth-data';
import { RatingData } from '../types/rating-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { UserCommentData } from '../types/user-comment-data';

export const fetchHotelsAction = createAsyncThunk<Offers, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers>('/hotels');
    return data;
  },
);

export const fetchHotelAction = createAsyncThunk<OfferDatas, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotel',
  // NOTE: Запрос на сервер, одновременно на несколько ресурсов
  async (_arg, { dispatch, extra: api }) => {
    const offerDatas = await Promise.all([
      api.get<Offer>(`/hotels/${_arg}`),
      api.get<Comments>(`/comments/${_arg}`),
      api.get<Offers>(`/hotels/${_arg}/nearby`)
    ]);
    return [offerDatas[0].data, offerDatas[1].data, offerDatas[2].data];
  }
);

export const checkAuthAction = createAsyncThunk<ResponseAuthorization, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/checkAuth',
  // NOTE: Проверка авторизации при запросе, уже авторизованного
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<ResponseAuthorization, AuthData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/login',
  // NOTE: Авторизация
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const commentsAction = createAsyncThunk<UserCommentData, RatingData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/comments',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserCommentData>(`${APIRoute.Comments}${id}`, { comment, rating });
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
