import { NameSpace } from '../../data-store/data-variables';
import { State } from '../../types/state';
import { Comments, Offer, Offers } from '../../types/type-store';

export const getIsHotelsDataLoading = (state: State): boolean => state[NameSpace.Data].isHotelsDataLoading;
export const getIsHotelDataLoading = (state: State): boolean => state[NameSpace.Data].isHotelDataLoading;
export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getCity = (state: State): string => state[NameSpace.Data].city;
export const getSortName = (state: State): string => state[NameSpace.Data].sortName;
export const getOffersCity = (state: State): Offers => state[NameSpace.Data].offersCity;
export const getIsOpenSort = (state: State): boolean => state[NameSpace.Data].isOpenSort;
export const getError = (state: State): string | null => state[NameSpace.Data].error;
export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;
export const getComments = (state: State): Comments => state[NameSpace.Data].comments;
export const getOffersNearby = (state: State): Offers => state[NameSpace.Data].offersNearby;
export const getIsSendingComment = (state: State): boolean => state[NameSpace.Data].isSendingComment;
export const getClearing = (state: State): boolean => state[NameSpace.Data].clearingForm;
