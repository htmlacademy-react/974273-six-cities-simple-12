import { Link } from 'react-router-dom';
import { CardDataObject } from '../../types/type-store';

function roundUp(n: number) {
  return Math.round(n);
}

function Card({ dataRoom, onMouseOverHandler }: CardDataObject): JSX.Element {

  return (
    <article className="cities__card place-card" onMouseOver={() => onMouseOverHandler(dataRoom.id)}>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#todo">
          <img className="place-card__image" src={dataRoom.images[0]} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;</b>
            <span className="place-card__price-text">&#47;&nbsp;{dataRoom.price}</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          {/* <div className="place-card__stars rating__stars"> */}
          <div className="place-card__stars">
            <span style={{ width: '80%' }}>{roundUp(dataRoom.rating)}</span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${dataRoom.id}`}>{dataRoom.title}</Link>
        </h2>
        <p className="place-card__type">{dataRoom.type}</p>
      </div>
    </article>
  );
}

export default Card;
