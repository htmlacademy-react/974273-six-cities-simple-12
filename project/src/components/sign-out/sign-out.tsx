import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getUserAuthorization } from '../../store/user-process/selectors';

function SignOut(): JSX.Element {

  const { email, avatarUrl } = useAppSelector(getUserAuthorization);
  const dispatch = useAppDispatch();

  const signOutChange = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: `url(${avatarUrl})` }}></div>
          <span className="header__user-name user__name">{email}</span>
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
