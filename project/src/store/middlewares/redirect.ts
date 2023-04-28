import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { rootReducer } from '../root-reducer';

import browserHistory from '../../browser-history/browser-history';

type Reducer = ReturnType<typeof rootReducer>

export const redirect: Middleware<unknown, Reducer> = (store) => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'route/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
