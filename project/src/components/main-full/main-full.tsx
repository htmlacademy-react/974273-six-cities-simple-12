import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import { useAppSelector } from '../../hooks';

function MainFull() {

  const rentRoomsCity = useAppSelector((state) => state.offers);
  const cityName = useAppSelector((state) => state.city);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{rentRoomsCity.length} places to stay in {cityName}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
        </form>
        <CardList listRooms={rentRoomsCity} />
      </section>
      <div className="cities__right-section">
        <Map points={rentRoomsCity} isMapBig={false} />
      </div>
    </div>
  );
}

export default MainFull;