import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../data-store/data-variables';
import Main from '../../pages/main/main';
import Room from '../../pages/room/room';
import Error from '../../pages/error/error';
import Layout from '../layout/layout';
import PrivateRoute from '../privet-route/privet-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';

function App(): JSX.Element {

  const isHotelsDataLoading = useAppSelector((state) => state.isHotelsDataLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (isHotelsDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
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
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus} >
                  <Main />
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
