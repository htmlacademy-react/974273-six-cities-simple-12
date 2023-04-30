import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { AppRoute } from '../../data-store/data-variables';

import HistoryRouter from '../history-route/history-route';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Error from '../../pages/errors/error';
import Layout from '../layout/layout';
import PrivateRoute from '../privet-route/privet-route';
import browserHistory from '../../browser-history/browser-history';
import NotFound from '../../pages/errors/error_404';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory} >
        <Routes>
          <Route path={AppRoute.Main} element={<Layout />}>
            <Route
              index
              element={<Main />}
            />
            <Route
              path={AppRoute.Room}
              element={<Room />}
            />
          </Route>
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute />
            }
          />
          <Route
            path="*"
            element={<Error />}
          />
          <Route
            path={AppRoute.Error}
            element={<NotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
