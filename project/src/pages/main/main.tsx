import { Helmet } from 'react-helmet-async';
import MainEmpty from '../../components/main-empty/main-empty';
import MainMenu from '../../components/main-menu/main-menu';
import MainFull from '../../components/main-full/main-full';
// import CardList from '../../components/card-list/card-list';
// import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';

function Main(): JSX.Element {

  const roomsCitiRend = useAppSelector((state) => state.offers);

  return (
    <main className="page__main page__main--index">
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
