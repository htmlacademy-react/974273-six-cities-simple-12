import { Helmet } from 'react-helmet-async';
import { AppMainBodyProps } from '../../types/type-store';
import MainMenu from '../../components/main-menu/main-menu';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';

function MainFull(props: AppMainBodyProps): JSX.Element {

  const { totalNumberOffers, rentListRoom } = props;
  const city = 'Amsterdam';
  const roomsCitiRend = rentListRoom.filter((room) => room.city.name === city);
  const cityCoord = roomsCitiRend[0].city;

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>Six cities - Main</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <MainMenu />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{totalNumberOffers} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
            </form>
            <CardList listRooms={roomsCitiRend} />
          </section>
          <div className="cities__right-section">
            <Map city={cityCoord} points={roomsCitiRend} isMapBig={false} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainFull;
