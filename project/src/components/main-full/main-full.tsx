import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isOpenSort } from '../../store/actions';
import SortingOptions from '../sorting-options/sorting-options';

function MainFull() {

  const opensortOprions = useAppSelector((state) => state.isOpenSort);
  const dispatch = useAppDispatch();

  const clickSortBy = () => {
    dispatch(isOpenSort());
  };

  const rentRoomsCity = useAppSelector((state) => state.offers);
  const cityName = useAppSelector((state) => state.city);
  const sortName = useAppSelector((state) => state.sortName);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{rentRoomsCity.length} places to stay in {cityName}</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span
            className="places__sorting-type"
            tabIndex={0}
            onClick={clickSortBy}
          >
            {sortName}
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          {opensortOprions ? <SortingOptions /> : ''}
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
