import { createAction } from '@reduxjs/toolkit';
import { Comments, Offer, Offers, ResponseAuthorization } from '../types/type-store';
import { AppRoute, AuthorizationStatus } from '../data-store/data-variables';

export const chooseCity = createAction<{ cityName: string }>('city/chooseCity');

export const chooseOption = createAction<{ nameOption: string }>('sort/chooseOption');

export const isOpenSort = createAction('sort/openSort');

export const changeColorMarker = createAction<{ markerId: number }>('marker/changeColorMarker');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadOffer = createAction<Offer>('data/loadOffer');

export const loadOffersNearby = createAction<Offers>('data/loadOffersNearby');

export const loadComments = createAction<Comments>('data/loadComments');

export const setHotelsDataLoadingStatus = createAction<boolean>('data/setHotelsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const responseAuthorization = createAction<ResponseAuthorization>('user/responseAuthorization');

export const setError = createAction<string | null>('game/setError');

export const redirectToRoute = createAction<AppRoute>('route/redirectToRoute');

export const setStatusSendingComment = createAction<boolean>('comment/setStatusSendingComment');
