// import { PrivateRouteProps } from '../../types/type-store';
import { AppRoute, AuthorizationStatus } from '../../data-store/data-variables';
import Login from '../../pages/login/login';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { checkAuthAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

function PrivateRoute() {

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return <Login />;
}

export default PrivateRoute;
