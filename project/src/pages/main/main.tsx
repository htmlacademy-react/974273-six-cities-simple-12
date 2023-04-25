import { Helmet } from 'react-helmet-async';
import MainEmpty from '../../components/main-empty/main-empty';
import MainMenu from '../../components/main-menu/main-menu';
import MainFull from '../../components/main-full/main-full';
import { useAppDispatch, useAppSelector } from '../../hooks';
import cn from 'classnames';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { fetchHotelsAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { getIsHotelsDataLoading, getOffersCity } from '../../store/data-process/selectors';

function Main(): JSX.Element {


  const isHotelsDataLoading = useAppSelector(getIsHotelsDataLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotelsAction());
  }, [dispatch]);

  const roomsCitiRend = useAppSelector(getOffersCity);

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
