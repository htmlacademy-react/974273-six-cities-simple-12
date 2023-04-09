import { Helmet } from 'react-helmet-async';
import MainEmpty from '../../components/main-empty/main-empty';
import MainMenu from '../../components/main-menu/main-menu';
import MainFull from '../../components/main-full/main-full';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';

function Main(): JSX.Element {

  const roomsCitiRend = useAppSelector((state) => state.offersCity);

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
