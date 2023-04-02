import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';

// NOTE: Создание хранилища с помощью @reduxjs/toolkit
export const store = configureStore({ reducer });
