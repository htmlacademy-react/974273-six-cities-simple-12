import { useEffect, useState } from 'react';
import StarRating from '../star/star-rating';

function FormWithComment(): JSX.Element {

  const [dataForm, setDataForm] = useState({
    rating: 0,
    review: '',
  });

  const [isDisabled, setDisabled] = useState(true);

  useEffect(() => {
    if ((dataForm.review.length > 50) && Number(dataForm.rating) > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dataForm.rating, dataForm.review]);

  function fieldChangeHeandle(event: React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>): void {

    const { value, name } = event.target as HTMLInputElement;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from(Array(5), (v, i) => (<StarRating key={i} choosingStar={fieldChangeHeandle} numberId={5 - i} />))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" onChange={fieldChangeHeandle} value={dataForm.review} placeholder="Tell how was your stay, what you like and what can be improved" minLength={50} maxLength={300}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default FormWithComment;
