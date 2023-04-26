import Map from '../../components/map/map';
import CardList from '../../components/card-list/card-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SortingOptions from '../sorting-options/sorting-options';
import { getCity, getIsOpenSort, getOffersCity, getSortName } from '../../store/data-process/selectors';
import { isOpenSort } from '../../store/data-process/data-process';

function MainFull() {

  const opensortOprions = useAppSelector(getIsOpenSort);
  const dispatch = useAppDispatch();

  const clickSortBy = () => {
    dispatch(isOpenSort());
  };

  const rentRoomsCity = useAppSelector(getOffersCity);
  const cityName = useAppSelector(getCity);
  const sortName = useAppSelector(getSortName);

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
