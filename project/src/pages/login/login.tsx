import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link } from 'react-router-dom';
import { FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { AuthData } from '../../types/auth-data';
import { loginAction } from '../../store/api-actions';

function Login() {

  const cityName = useAppSelector((state) => state.city);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const [pass, setPass] = useState('');
  const [passError, setPassError] = useState('');
  const [formValid, setFormValid] = useState(true);

  const passwordHandler = (event: { target: { value: SetStateAction<string> } }) => {

    setPass(event.target.value);

    const gap = /^\S*$/;
    const letter = /[A-Za-z]+/g;
    const number = /[0-9]+/;

    if (event.target.value.length === 0) {
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
    if (passError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [passError]);

  return (
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
                ref={loginRef}
                className="login__input form__input"
                type="email"
                autoComplete="new-email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                onChange={passwordHandler}
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
          <div className="locations__item">
            <Link to={'/'} className="locations__item-link">
              <span>{cityName}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
