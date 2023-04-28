import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Params, useParams } from 'react-router-dom';

import { RatingData } from '../../types/rating-data';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { commentsAction } from '../../store/api-actions';
import { RATINGS } from '../../data-store/data-const';
import { getClearing, getIsSendingComment } from '../../store/data-process/selectors';
import { clearingFormAction } from '../../store/data-process/data-process';

import StarRating from '../star/star-rating';

function FormWithComment(): JSX.Element {

  const dispatch = useAppDispatch();
  const isDisabledSending = useAppSelector(getIsSendingComment);
  const clearingForm = useAppSelector(getClearing);
  const formRef = useRef<HTMLFormElement | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const { id } = useParams<Params>();

  const [dataForm, setDataForm] = useState({
    rating: '',
    review: '',
  });

  const breakerButton = useMemo(() => {
    const breaker = dataForm.rating === '' || dataForm.review === '' || dataForm.review.length < 50 || isDisabledSending;
    return breaker;
  }, [dataForm.rating, dataForm.review, isDisabledSending]);

  const handleFormInput = (event: React.FormEvent<HTMLTextAreaElement> | React.FormEvent<HTMLInputElement>): void => {

    const { value, name } = event.target as HTMLInputElement;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  useEffect(() => {

    let isMounted = true;

    if (isMounted) {
      if (!clearingForm) {
        setDataForm({
          rating: '',
          review: '',
        });

        if (formRef.current !== null) {
          formRef.current.reset();
        }

        dispatch(clearingFormAction());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [clearingForm, dataForm.rating, dispatch]);

  const onSubmit = (ratingData: RatingData) => {
    dispatch(commentsAction(ratingData));
  };

  const handleSubmitSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      id: String(id),
      comment: dataForm.review,
      rating: Number(dataForm.rating),
    });
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitSend}
      ref={formRef}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map((rating, i) => (<StarRating key={rating} heandleInputStar={handleFormInput} choiseStar={dataForm.rating} ratingName={rating} numberId={5 - i} isDisabledSending={isDisabledSending} />))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" onChange={handleFormInput} value={dataForm.review} placeholder="Tell how was your stay, what you like and what can be improved" minLength={50} maxLength={300} disabled={isDisabledSending}></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={breakerButton}>Submit</button>
      </div>
    </form>
  );
}

export default FormWithComment;
