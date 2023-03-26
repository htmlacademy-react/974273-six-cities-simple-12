import { Link } from 'react-router-dom';
import { CardDataObject } from '../../types/type-store';
import Error from '../../pages/error/error';
import { RATING_STEP } from '../../data-store/data-const';

function Card({ dataRoom, onMouseOverHandler }: CardDataObject): JSX.Element {

  const { id, images, price, rating, title, type, isPremium } = dataRoom;
  const ratingProcent = rating * RATING_STEP;


  if (!id) {
    return <Error />;
  }

  return (
    <article className="cities__card place-card" onMouseOver={() => onMouseOverHandler(id)}>
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ' '}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
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
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default Card;
