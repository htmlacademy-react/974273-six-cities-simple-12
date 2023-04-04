import { AuthorizationStatus } from '../data-store/data-variables';

export type AppMainBodyProps = {
  totalNumberOffers: number;
  rentListRoom: CardProps[];
}

export type Host = {
  avatarUrl: string | undefined;
  id: number;
  isPro: boolean;
  name: string;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: Location;
  name: string;
}

export type CardProps = {
  id: number;
  bedrooms: number;
  city: City;
  maxAdults: number;
  goods: string[];
  host: Host;
  type: string;
  title: string;
  images: string[];
  description: string;
  previewImage: string;
  isPremium: boolean;
  location: Location;
  price: number;
  rating: number;
}

export type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export type CardDataObject = {
  dataRoom: CardProps;
};

export type ListRoomsProps = {
  listRooms: CardProps[];
}

export type ListRoomProps = {
  listRoom: string[] | undefined;
}

export type StarProps = {
  choosingStar: (e: React.FormEvent<HTMLInputElement>) => void;
  numberId: number;
}

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
}

export type ReviewProps = {
  review: Review;
}

export type ReviewListProps = {
  reviews: Review[];
}

export type CityCoordsProp = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
}

export type MapProps = {
  city?: CityCoordsProp;
  points: CardProps[];
  isMapBig: boolean;
}

export type CityItemProps = {
  city: string;
  clickCity(city: string): void;
}
