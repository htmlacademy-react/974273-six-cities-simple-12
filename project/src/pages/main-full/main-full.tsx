
import { AppMainBodyProps } from '../../types/type-store';
import Card from '../../components/Card/Card';
import MainMenu from '../../components/main-menu/main-menu';

function MainFull(props: AppMainBodyProps): JSX.Element {

  const { totalNumberOffers, rentAmsterdam } = props;

  return (
    <main className="page__main page__main--index">
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
            <div className="cities__places-list places__list tabs__content">
              {rentAmsterdam.map((item) => <Card key={item.price} priceCard={item.price} />)}
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map"></section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainFull;
