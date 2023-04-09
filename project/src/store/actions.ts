import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/type-store';

export const chooseCity = createAction<{ cityName: string }>('city/chooseCity');

export const chooseOption = createAction<{ nameOption: string }>('sort/chooseOption');

export const isOpenSort = createAction('sort/openSort');

export const changeColorMarker = createAction<{ markerId: number }>('marker/changeColorMarker');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const setHotelsDataLoadingStatus = createAction<boolean>('data/setHotelsDataLoadingStatus');
