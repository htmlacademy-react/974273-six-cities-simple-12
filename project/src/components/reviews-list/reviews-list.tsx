import { ReviewListProps } from '../../types/type-store';
import { sortByMin } from '../../utils/utils';

import Rewiew from '../review/review';

function ReviewsList({ reviews }: ReviewListProps): JSX.Element {

  const reveiwsCopyAll = reviews.slice();

  const reviewsCopy = reveiwsCopyAll.length > 10 ? reveiwsCopyAll.slice(0, 10) : reveiwsCopyAll.slice();

  if (reveiwsCopyAll.length > 1) {
    reveiwsCopyAll.sort((a, b) => sortByMin(new Date(a.date).valueOf(), new Date(b.date).valueOf()));
  }


  return (
    <ul className="reviews__list">
      {reviewsCopy.map((review) => <Rewiew key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewsList;
