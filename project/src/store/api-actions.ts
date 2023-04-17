import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Comments, Offer, Offers } from '../types/type-store';
import { APIRoute, AuthorizationStatus } from '../data-store/data-variables';
import { TIMEOUT_SHOW_ERROR } from '../data-store/data-const';
import { loadOffers, requireAuthorization, setError, setHotelsDataLoadingStatus, responseAuthorization, loadOffer, loadOffersNearby, loadComments, setStatusSendingComment } from './actions';
import { AuthData } from '../types/auth-data';
import { RatingData } from '../types/rating-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
import { store } from '.';
import { UserCommentData } from '../types/user-comment-data';

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const fetchHotelsAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setHotelsDataLoadingStatus(true));
    const { data } = await api.get<Offers>('/hotels');
    dispatch(setHotelsDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchHotelAction = createAsyncThunk<void, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotel',
  async (_arg, { dispatch, extra: api }) => {
    // dispatch(setHotelsDataLoadingStatus(true));
    const resultData = await Promise.all([
      api.get<Offer>(`/hotels/${_arg}`),
      api.get<Comments>(`/comments/${_arg}`),
      api.get<Offers>(`/hotels/${_arg}/nearby`)
    ]);
    // dispatch(setHotelsDataLoadingStatus(false));
    dispatch(loadOffer(resultData[0].data));
    dispatch(loadComments(resultData[1].data));
    dispatch(loadOffersNearby(resultData[2].data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(responseAuthorization(data));
  }
);

export const commentsAction = createAsyncThunk<void, RatingData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/comments',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    dispatch(setStatusSendingComment(false));
    const { data } = await api.post<UserCommentData>(`${APIRoute.Comments}${id}`, { comment, rating });
    dispatch(setStatusSendingComment(true));
    dispatch(loadComments(data));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
