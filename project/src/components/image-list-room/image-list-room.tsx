import { ListRoomProps } from '../../types/type-store';

function ImageListRoom({ listRoom }: ListRoomProps): JSX.Element {

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {listRoom?.map((imag) => <div key={imag} className="property__image-wrapper"><img className="property__image" src={imag} alt="Photo studio" /></div>)}
      </div>
    </div>
  );
}

export default ImageListRoom;
