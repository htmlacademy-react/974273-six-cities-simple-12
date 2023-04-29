import { ListRoomsProps } from '../../types/type-store';

import Card from '../card-item/card-item';

function CardList({ listRooms }: ListRoomsProps): JSX.Element {

  return (
    <div className="near-places__list places__list tabs__content" >
      {listRooms.map((item) => <Card key={item.id} dataRoom={item} />)}
    </div>
  );
}

export default CardList;
