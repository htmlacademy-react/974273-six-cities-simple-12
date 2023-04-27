import { createAction } from '@reduxjs/toolkit';

import { AppRoute } from '../data-store/data-variables';

export const redirectToRoute = createAction<AppRoute>('route/redirectToRoute');
