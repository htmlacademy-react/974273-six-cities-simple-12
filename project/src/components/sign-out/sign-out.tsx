import { Link } from 'react-router-dom';

function SignOut(): JSX.Element {
  return (
    <>
      <li className="header__nav-item user">
        <div className="header__nav-profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
        </div>
      </li>
      <li className="header__nav-item">
        <Link to={'/'} className="header__nav-link">
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default SignOut;
