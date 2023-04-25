// import { PrivateRouteProps } from '../../types/type-store';
import { AppRoute, AuthorizationStatus } from '../../data-store/data-variables';
import Login from '../../pages/login/login';
import { useAppSelector } from '../../hooks';
import { Navigate } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
// import { Navigate } from 'react-router-dom';

function PrivateRoute() {

  // const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  // useEffect(() => {
  //   dispatch(checkAuthAction());
  // }, [dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return <Login />;
}

export default PrivateRoute;
