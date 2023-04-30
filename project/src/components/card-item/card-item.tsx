import { Link } from 'react-router-dom';

import { CardDataObject } from '../../types/type-store';
import { MARKER_OUT } from '../../data-store/data-const';
import { useAppDispatch } from '../../hooks/hook';
import { changeColorMarker } from '../../store/main-process/main-process';
import { roundUp } from '../../utils/utils';

import Error from '../../pages/errors/error';
// import { fetchHotelAction } from '../../store/api-actions';

function Card({ dataRoom }: CardDataObject): JSX.Element {

  const { id, images, price, rating, title, type, isPremium } = dataRoom;
  const ratingProcent = roundUp(rating);
  const dispatch = useAppDispatch();

  const handleMouseOver = () => {
    const markerId = id;
    dispatch(changeColorMarker(markerId));
  };

  const handleMouseOut = () => {
    dispatch(changeColorMarker(MARKER_OUT));
  };

  if (!id) {
    return <Error />;
  }

  // const handlerLinkClick = () => {
  //   dispatch(fetchHotelAction(String(id)));
  // };

  return (
    <article className="cities__card place-card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ' '}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link
          to={`/offer/${id}`}
        // onClick={handlerLinkClick}
        >
          <img className="place-card__image" src={images[0]} width="260" height="200" alt="Room" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;</b>
            <span className="place-card__price-text">&#47;&nbsp;{price}</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingProcent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${id}`}
          // onClick={handlerLinkClick}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
