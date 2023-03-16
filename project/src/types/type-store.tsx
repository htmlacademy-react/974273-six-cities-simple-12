import { AuthorizationStatus } from '../data-store/data-const';

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

export type CardProps = {
  id: number;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  host: Host;
  type: string;
  title: string;
  images: string[];
  description: string;
  previewImage: string;
  isPremium: boolean;
  price: number;
  rating: number;
}

export type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export type CardDataObject = {
  dataRoom: CardProps;
  onMouseOverHandler(id: number): void;
  idActive: number;
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
