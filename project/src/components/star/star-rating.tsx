import { StarProps } from '../../types/type-store';

function StarRating({ heandleInputStar, choiseStar, numberId, isDisabledSending, ratingName }: StarProps): JSX.Element {

  const inputId = `${String(numberId)}-stars`;

  return (
    <>
      <input className="form__rating-input visually-hidden" onChange={heandleInputStar} checked={choiseStar === String(numberId)} name="rating" value={numberId} id={inputId} type="radio" disabled={isDisabledSending} />
      <label htmlFor={inputId} className="reviews__rating-label form__rating-label" title={ratingName}>
        <svg className="form__star-image" width="37" style={{ height: '33px' }}>
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarRating;
