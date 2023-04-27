import { ReviewProps } from '../../types/type-store';
import { roundUp } from '../../utils/utils';

function Rewiew({ review }: ReviewProps): JSX.Element {

  const { comment, date, rating, user } = review;
  const { avatarUrl, name } = user;

  const dateComment = new Date(date);
  const dataCommentMachine = dateComment.toISOString().split('T')[0];
  const dataCommentPublic = dateComment.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

  const ratingProcent = roundUp(rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info" >
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingProcent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text" style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '550px' }} >
          {comment}
        </p>
        <time className="reviews__time" dateTime={dataCommentMachine}>{dataCommentPublic}</time>
      </div>
    </li>
  );
}

export default Rewiew;
