
import { Params, useParams } from 'react-router-dom';
import FormWithComment from '../../components/form-with-comment/form-with-comment';
import ImageListRoom from '../../components/image-list-room/image-list-room';
import PremiumRoomFlag from '../../components/premium-room-flag/premium-room-flag';
import ReviewsList from '../../components/reviews-list/reviews-list';
import TechnicListRoom from '../../components/technick-lisl-room/tichnick-list-room';
import { reviews } from '../../mocks/reviews';
import { CardProps } from '../../types/type-store';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../data-store/data-variables';

function Room(): JSX.Element {

  const offersRoom = useAppSelector((state) => state.offersCity);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const { id } = useParams<Params>();
  const dataRoom: CardProps | undefined = offersRoom.find((elem) => elem.id === Number(id));
  const dataRoomsOnNeighbourhood = offersRoom.filter((elem) => elem.id !== Number(id)).slice(0, 3);

  if (!dataRoom) {
    return <>Page not Faind</>;
  }

  const { images, goods, host, isPremium, title, rating, bedrooms, maxAdults, description, price } = dataRoom;
  const { avatarUrl, name, isPro } = host;

  return (
    <main className="page__main page__main--property">
      <section className="property">
        <ImageListRoom listRoom={images} />
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium ? <PremiumRoomFlag /> : null}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                Apartment
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedrooms}
              </li>
              <li className="property__feature property__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <TechnicListRoom listRoom={goods} />
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {name}
                </span>
                {isPro ? <span className="property__user-status">Pro</span> : null}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <ReviewsList reviews={reviews} />
              {authorizationStatus === AuthorizationStatus.Auth ? <FormWithComment /> : ''}
            </section>
          </div>
        </div>
        <Map points={dataRoomsOnNeighbourhood} isMapBig />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <CardList listRooms={dataRoomsOnNeighbourhood} />
        </section>
      </div>
    </main>
  );
}

export default Room;
