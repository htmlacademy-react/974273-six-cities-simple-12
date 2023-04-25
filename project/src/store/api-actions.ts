import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Comments, Offer, OfferDatas, Offers, ResponseAuthorization } from '../types/type-store';
import { APIRoute } from '../data-store/data-variables';
// import { TIMEOUT_SHOW_ERROR } from '../data-store/data-const';
// import { loadOffer, loadOffersNearby, loadComments, setStatusSendingComment, setHotelDataLoadingStatus } from './actions';
import { AuthData } from '../types/auth-data';
import { RatingData } from '../types/rating-data';
import { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';
// import { store } from '.';
import { UserCommentData } from '../types/user-comment-data';

// export const clearErrorAction = createAsyncThunk(
//   'data/clearError',
//   () => {
//     setTimeout(
//       () => store.dispatch(setError(null)),
//       TIMEOUT_SHOW_ERROR,
//     );
//   }
// );

export const fetchHotelsAction = createAsyncThunk<Offers, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotels',
  async (_arg, { dispatch, extra: api }) => {
    // dispatch(setHotelsDataLoadingStatus(true));
    const { data } = await api.get<Offers>('/hotels');
    // dispatch(setHotelsDataLoadingStatus(false));
    // dispatch(loadOffers(data));
    return data;
  },
);

export const fetchHotelAction = createAsyncThunk<OfferDatas, string, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/fetchHotel',
  // NOTE: Запрос на сервер, одновременно на несколько ресурсов
  async (_arg, { dispatch, extra: api }) => {
    // dispatch(setHotelDataLoadingStatus(true));
    const offerDatas = await Promise.all([
      api.get<Offer>(`/hotels/${_arg}`),
      api.get<Comments>(`/comments/${_arg}`),
      api.get<Offers>(`/hotels/${_arg}/nearby`)
    ]);
    // dispatch(loadOffer(resultData[0].data));
    // dispatch(loadComments(resultData[1].data));
    // dispatch(loadOffersNearby(resultData[2].data));
    // dispatch(setHotelDataLoadingStatus(false));
    // return offerDatas;
    return [offerDatas[0].data, offerDatas[1].data, offerDatas[2].data];
  }
);

export const checkAuthAction = createAsyncThunk<ResponseAuthorization, undefined, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/checkAuth',
  // NOTE: Проверка авторизации при запросе, уже авторизованного
  async (_arg, { dispatch, extra: api }) => {
    // try {
    //   const { data } = await api.get<UserData>(APIRoute.Login);
    //   dispatch(requireAuthorization(AuthorizationStatus.Auth));
    //   dispatch(responseAuthorization(data));
    // } catch {
    //   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    // }
    const { data } = await api.get<UserData>(APIRoute.Login);
    // dispatch(responseAuthorization(data));
    return data;
  },
);

export const loginAction = createAsyncThunk<ResponseAuthorization, AuthData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'user/login',
  // NOTE: Авторизация
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    // dispatch(responseAuthorization(data));
    return data;
  },
);

export const commentsAction = createAsyncThunk<UserCommentData, RatingData, { dispatch: AppDispatch; state: State; extra: AxiosInstance }>(
  'data/comments',
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    // dispatch(setStatusSendingComment(true));
    const { data } = await api.post<UserCommentData>(`${APIRoute.Comments}${id}`, { comment, rating });
    // dispatch(setStatusSendingComment(false));
    // dispatch(loadComments(data));
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
