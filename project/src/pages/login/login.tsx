import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';

import { useAppDispatch } from '../../hooks/hook';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';

import RandomCity from '../../components/random-city/random-city';

function Login(): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [formValid, setFormValid] = useState(true);

  const handleInputChangeEmail = (event: { target: { value: SetStateAction<string> } }) => {

    const validityEmail = /^[_a-z0-9-\\+-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i;

    setEmail(event.target.value);

    if (setEmail.length === 0) {
      setEmailError('error');
    } else if (!validityEmail.test(String(event.target.value))) {
      setEmailError('error');
    } else {
      setEmailError('');
    }
  };

  const handleInputChangePassword = (event: { target: { value: SetStateAction<string> } }) => {

    setPass(event.target.value);

    const gap = /^\S*$/;
    const letter = /[A-Za-z]+/g;
    const number = /[0-9]+/;

    if (setPass.length === 0) {
      setPassError('Добавьте в пароль минимум 1 цифру и 1 букву.');
    } else if (!gap.test(String(event.target.value).toLowerCase())) {
      setPassError('Уберите пробел.');
    } else if (!letter.test(String(event.target.value).toLowerCase())) {
      setPassError('Добавьте одну букву.');
    } else if (!number.test(String(event.target.value).toLowerCase())) {
      setPassError('Добавьте одну цифру.');
    } else {
      setPassError('');
    }
  };

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  useEffect(() => {

    let isMounted = true;

    if (isMounted) {
      if (passError || emailError) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }

    return () => {
      isMounted = false;
    };

  }, [passError, emailError]);

  return (
    <div className="page page--gray page--login">
      <div style={{ display: 'none' }}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={'/'} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <Helmet>
          <title>Six cities - Sign In</title>
        </Helmet>
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={handleInputChangeEmail}
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  autoComplete="new-email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={handleInputChangePassword}
                  id="password"
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={pass}
                />
              </div>
              {(passError) && <div style={{ color: 'red', marginBottom: '20px' }}>{passError}</div>}
              <button disabled={formValid} className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            {<RandomCity />}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
