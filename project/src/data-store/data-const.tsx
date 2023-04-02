
// export const RentCount = {
//   totalNumberOffers: 1324,
// } as const;

export const ZERO_ID = 0;

export enum AppRoute {
  Main = '/',
  Room = '/offer/:id',
  Login = '/login',
  PrivateOffice = '/private',
  NoPlace = '/no-place'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const RATING_STEP = 20;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];
