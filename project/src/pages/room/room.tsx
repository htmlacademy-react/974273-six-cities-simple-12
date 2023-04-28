import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { AppRoute, AuthorizationStatus } from '../../data-store/data-variables';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { fetchHotelAction, fetchHotelsAction } from '../../store/api-actions';
import { redirectToRoute } from '../../store/actions';
import { getComments, getIsHotelDataLoading, getOffer, getOffersCity, getOffersNearby } from '../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { roundUp } from '../../utils/utils';

import FormWithComment from '../../components/form-with-comment/form-with-comment';
import ImageListRoom from '../../components/image-list-room/image-list-room';
import PremiumRoomFlag from '../../components/premium-room-flag/premium-room-flag';
import ReviewsList from '../../components/reviews-list/reviews-list';
import TechnicListRoom from '../../components/technick-lisl-room/tichnick-list-room';
import CardList from '../../components/card-list/card-list';
import Map from '../../components/map/map';
import LoadingScreen from '../../components/loading-screen/loading-screen';

function Room(): JSX.Element {

  const { id } = useParams() as { id: string };

  const isHotelDataLoading = useAppSelector(getIsHotelDataLoading);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const room = useAppSelector(getOffer);
  const comments = useAppSelector(getComments);
  const roomsNearby = useAppSelector(getOffersNearby);
  const hotels = useAppSelector(getOffersCity);
  const dispatch = useAppDispatch();

  useEffect(() => {

    let isMounted = true;

    if (isMounted) {
      dispatch(fetchHotelsAction());
      dispatch(fetchHotelAction(String(id)));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  if (isHotelDataLoading) {
    return <LoadingScreen />;
  }
  if (!room) {
    return <div>NotFoundPage</div>;
  }

  const { images, goods, host, isPremium, title, rating, bedrooms, maxAdults, description, price, type } = room;
  const { avatarUrl, name, isPro } = host;
  const ratingProcent = roundUp(rating);

  if (!hotels.find((item) => item.id === Number(id))) {
    dispatch(redirectToRoute(AppRoute.Error_404));
  }

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
                <span style={{ width: `${ratingProcent}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
              <ReviewsList reviews={comments} />
              {authorizationStatus === AuthorizationStatus.Auth ? <FormWithComment /> : ''}
            </section>
          </div>
        </div>
        <Map points={roomsNearby} room={room} isMapBig />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <CardList listRooms={roomsNearby} />
        </section>
      </div>
    </main>
  );
}

export default Room;
