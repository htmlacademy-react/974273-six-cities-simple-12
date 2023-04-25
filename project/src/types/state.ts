// NOTE: Типизация глобального хранилища, типизация Redux
import { AuthorizationStatus } from '../data-store/data-variables';
import { store } from '../store';
import { Comments, Offer, Offers, ResponseAuthorization } from './type-store';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
	authorizationStatus: AuthorizationStatus;
	userAuthorization: ResponseAuthorization;
}

export type DataProcess = {
	isHotelsDataLoading: boolean;
	isHotelDataLoading: boolean;
	offers: Offers;
	city: string;
	sortName: string;
	offersCity: Offers;
	isOpenSort: boolean;
	error: string | null;
	offer: Offer | null;
	comments: Comments;
	offersNearby: Offers;
	isSendingComment: boolean;
}
export type MainProcess = {
	markerColor: number;
}
