import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

function SignOut(): JSX.Element {

  const userEmail = useAppSelector((state) => state.userAuthorization.email);
  const userIcon = useAppSelector((state) => state.userAuthorization.avatarUrl);
  const dispatch = useAppDispatch();

  const signOutChange = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${userIcon})` }}></div>
          <span className="header__user-name user__name">{userEmail}</span>
        </div>
      </li>
      <li className="header__nav-item" onClick={signOutChange}>
        <Link to={'/'} className="header__nav-link">
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default SignOut;
