import { PrivateRouteProps } from '../../types/type-store';
import { AuthorizationStatus } from '../../data-store/data-const';
import Login from '../../pages/login/login';

function PrivateRoute(props: PrivateRouteProps) {

  const { authorizationStatus, children } = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Login />
  );
}

export default PrivateRoute;
