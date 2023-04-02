import { createAction } from '@reduxjs/toolkit';

export const chooseCity = createAction<{ cityName: string }>('city/chooseCity');
