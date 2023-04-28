import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchHotelsAction } from '../../store/api-actions';
import { getIsHotelsDataLoading, getOffersCity } from '../../store/data-process/selectors';

import MainEmpty from '../../components/main-empty/main-empty';
import MainMenu from '../../components/main-menu/main-menu';
import MainFull from '../../components/main-full/main-full';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function Main(): JSX.Element {

  const isHotelsDataLoading = useAppSelector(getIsHotelsDataLoading);
  const roomsCitiRend = useAppSelector(getOffersCity);
  const dispatch = useAppDispatch();

  useEffect(() => {

    let isMounted = true;

    if (isMounted) {
      dispatch(fetchHotelsAction());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);


  if (isHotelsDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className={cn(
      'page--main page__main--index',
      { 'page__main--index-empty': roomsCitiRend.length === 0 }
    )}
    >
      <Helmet>
        <title>Six cities - Main</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <MainMenu />
      <div className="cities">
        {roomsCitiRend.length === 0 ? <MainEmpty /> : <MainFull />}
      </div>
    </main>
  );
}

export default Main;
