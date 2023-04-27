import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../data-store/data-variables';
import { dataProcess } from './data-process/data-process';
import { mainProcess } from './main-process/main-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
