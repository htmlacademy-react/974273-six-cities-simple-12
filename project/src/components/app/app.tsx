import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppMainBodyProps } from '../../types/type-store';
import { AppRoute } from '../../data-store/data-const';
import MainFull from '../../pages/main-full/main-full';
import Room from '../../pages/room/room';
import Login from '../../pages/login/login';
import PrivateOffice from '../../pages/private-office/private-office';
import NoPlace from '../../pages/no-place/no-place';
import Error from '../../pages/error/error';

function App(props: AppMainBodyProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainFull totalNumberOffers={props.totalNumberOffers} rentAmsterdam={props.rentAmsterdam} />}
        />
        <Route
          path={AppRoute.PrivateOffice}
          element={<PrivateOffice />}
        />
        <Route
          path={AppRoute.Room}
          element={<Room />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.NoPlace}
          element={<NoPlace />}
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
