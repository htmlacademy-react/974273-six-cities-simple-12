import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { processErrorHandle } from './process-error-handle';
import { store } from '../store';
import { redirectToRoute } from '../store/actions';
import { AppRoute } from '../data-store/data-variables';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BACKEND_URL = 'https://12.react.pages.academy/six-cities-simple';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {

  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayError(error.response)) {
        switch (error.response.status) {
          case 400: processErrorHandle('Данные не верны или произошел сбой запроса. ПОВТОРИТЕ ПОПЫТКУ.');
            break;
          case 404: store.dispatch(redirectToRoute(AppRoute.Error_404));
            break;
          case 401: processErrorHandle('');
            break;
          default: processErrorHandle(error.response.data.error);
        }
      }
      throw error;
    }
  );

  return api;
};
