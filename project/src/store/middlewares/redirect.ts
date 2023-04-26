import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import browserHistory from '../../browser-history/browser-history';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> = (store) => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'route/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
