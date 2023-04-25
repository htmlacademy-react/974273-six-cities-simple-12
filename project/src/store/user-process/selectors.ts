import { AuthorizationStatus, NameSpace } from '../../data-store/data-variables';
import { State } from '../../types/state';
import { ResponseAuthorization } from '../../types/type-store';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserAuthorization = (state: State): ResponseAuthorization => state[NameSpace.User].userAuthorization;
