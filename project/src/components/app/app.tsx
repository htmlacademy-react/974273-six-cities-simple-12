import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../data-store/data-variables';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Error from '../../pages/error/error';
import Layout from '../layout/layout';
import PrivateRoute from '../privet-route/privet-route';
import browserHistory from '../../browser-history/browser-history';
import NotFound from '../../pages/error/error_404';

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
            path={AppRoute.Error_404}
            element={<NotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
