import { createAction } from '@reduxjs/toolkit';

export const chooseCity = createAction<{ cityName: string }>('city/chooseCity');

export const chooseOption = createAction<{ nameOption: string }>('sort/chooseOption');

export const isOpenSort = createAction('sort/openSort');

export const changeColorMarker = createAction<{ markerId: number }>('marker/changeColorMarker');
