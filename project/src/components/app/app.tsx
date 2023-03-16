import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppMainBodyProps } from '../../types/type-store';
import { AppRoute, AuthorizationStatus } from '../../data-store/data-const';
import MainFull from '../../pages/main-full/main-full';
import Room from '../../pages/room/room';

import Error from '../../pages/error/error';
import Layout from '../layout/layout';
import PrivateRoute from '../privet-route/privet-route';

function App(props: AppMainBodyProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route
              index
              element={<MainFull totalNumberOffers={props.totalNumberOffers} rentListRoom={props.rentListRoom} />}
            />
            <Route
              path={AppRoute.Room}
              element={<Room />}
            />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth} >
                  <MainFull totalNumberOffers={props.totalNumberOffers} rentListRoom={props.rentListRoom} />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="*"
            element={<Error />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
