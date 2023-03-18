import { StarProps } from '../../types/type-store';

function StarRating({ choosingStar, numberId }: StarProps): JSX.Element {

  const inputId = `${numberId}-stars`;

  return (
    <>
      <input className="form__rating-input visually-hidden" onClick={choosingStar} name="rating" value={numberId} id={inputId} type="radio" />
      <label htmlFor={inputId} className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" style={{ height: '33px' }}>
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default StarRating;
