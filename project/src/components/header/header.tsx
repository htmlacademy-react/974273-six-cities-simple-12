import { Link } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import { useAppSelector } from '../../hooks';
import SignOut from '../sign-out/sign-out';
import { AuthorizationStatus } from '../../data-store/data-variables';

function HeaderBody(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={'/'} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderBody;
