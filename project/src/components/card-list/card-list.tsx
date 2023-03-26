import { useState } from 'react';
import Card from '../../components/Card/Card';
import { ZERO_ID } from '../../data-store/data-const';
import { ListRoomsProps } from '../../types/type-store';

function CardList({ listRooms }: ListRoomsProps): JSX.Element {

  const [activeId, setActiveId] = useState(ZERO_ID);

  return (
    <div className="near-places__list places__list tabs__content" id={String(activeId)}>
      {listRooms.map((item) => <Card key={item.id} dataRoom={item} onMouseOverHandler={(idNumber: number) => setActiveId(idNumber)} idActive={activeId} />)}
    </div>
  );
}

export default CardList;
