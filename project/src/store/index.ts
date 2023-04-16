import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';

const api = createAPI();

// NOTE: Создание хранилища с помощью @reduxjs/toolkit
// NOTE: middleware
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
