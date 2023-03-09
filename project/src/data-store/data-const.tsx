
export const RentCount = {
  totalNumberOffers: 1324,
} as const;

export const amsterdam = [
  {
    price: 3320
  },
  {
    price: 340
  },
  {
    price: 180
  },
  {
    price: 220
  },
  {
    price: 160
  }
];

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
