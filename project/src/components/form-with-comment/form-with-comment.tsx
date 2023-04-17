import { FormEvent, useEffect, useState } from 'react';
import StarRating from '../star/star-rating';
import { RatingData } from '../../types/rating-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Params, useParams } from 'react-router-dom';
import { commentsAction } from '../../store/api-actions';

function FormWithComment(): JSX.Element {

  const dispatch = useAppDispatch();
  const isDisabledSending = useAppSelector((state) => state.isSendingComment);
  // const formRef = useRef<HTMLFormElement>(null);
  const { id } = useParams<Params>();

  const [dataForm, setDataForm] = useState({
    rating: 0,
    review: '',
  });

  const [isDisabled, setDisabled] = useState(true);

  // useEffect(() => {
  //   if (isDisabledSending) {
  //     formRef.current?.reset();
  //   }
  // }, [isDisabledSending]);

  useEffect(() => {
    if ((dataForm.review.length > 50) && Number(dataForm.rating) > 0 && isDisabledSending) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [dataForm.rating, dataForm.review, isDisabledSending]);

  function fieldChangeHeandle(event: React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>): void {

    const { value, name } = event.target as HTMLInputElement;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  }

  const onSubmit = (ratingData: RatingData) => {
    dispatch(commentsAction(ratingData));
    setDataForm({
      rating: 0,
      review: '',
    });
  };

  const handleSubmitSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dataForm.review.length > 50 && dataForm.rating !== 0) {
      onSubmit({
        id: String(id),
        comment: dataForm.review,
        rating: dataForm.rating,
      });
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitSend}
    >
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
