import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../data-store/data-variables';
import { useAppSelector } from '../../hooks/hook';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

import LoadingScreen from '../loading-screen/loading-screen';
import Login from '../../pages/login/login';

function PrivateRoute(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return <Login />;
}

export default PrivateRoute;
