import { ListRoomProps } from '../../types/type-store';

function TechnicListRoom({ listRoom }: ListRoomProps) {
  return (
    <div className="property__inside">
      <h2 className="property__inside-title">What&apos;s inside</h2>
      <ul className="property__inside-list">
        {listRoom?.map((technick) => <li key={technick} className="property__inside-item">{technick}</li>)}
      </ul>
    </div>
  );
}

export default TechnicListRoom;
