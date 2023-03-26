import { ReviewListProps } from '../../types/type-store';
import Rewiew from '../review/review';

function ReviewsList({ reviews }: ReviewListProps): JSX.Element {

  const reviewsCopy = reviews.length > 10 ? reviews.slice(0, 10) : reviews.slice();

  return (
    <ul className="reviews__list">
      {reviewsCopy.map((review) => <Rewiew key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
