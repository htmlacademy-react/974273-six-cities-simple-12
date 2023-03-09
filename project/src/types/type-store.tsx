import { AuthorizationStatus } from '../data-store/data-const';

export type AppMainBodyProps = {
  totalNumberOffers: number;
  rentAmsterdam: { price: number }[];
}

export type CardProps = {
  priceCard: number;
}

export type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}
