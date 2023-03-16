import { useState } from 'react';
import StarRating from '../star/star-rating';

function FormWithComment(): JSX.Element {

  const [dataForm, setDataForm] = useState({
    rating: 0,
    review: '',
  });

  function choosingStar(event: React.FormEvent<HTMLInputElement>) {

    const { name, value } = event.target as HTMLInputElement;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  }

  function fieldChangeHeandle(event: React.FormEvent<HTMLTextAreaElement>): void {

    const { value, name } = event.target as HTMLTextAreaElement;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Array.from(Array(5), (v, i) => (<StarRating key={i} choosingStar={choosingStar} numberId={5 - i} />))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" onChange={fieldChangeHeandle} value={dataForm.review} placeholder="Tell how was your stay, what you like and what can be improved" minLength={50} maxLength={300}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default FormWithComment;
