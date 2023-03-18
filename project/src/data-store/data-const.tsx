
export const RentCount = {
  totalNumberOffers: 1324,
} as const;

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
