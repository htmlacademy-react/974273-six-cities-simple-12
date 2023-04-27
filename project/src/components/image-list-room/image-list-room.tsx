import { ListRoomProps } from '../../types/type-store';

function ImageListRoom({ listRoom }: ListRoomProps): JSX.Element {
  if (!listRoom) {
    return (
      <div>Not photo</div>
    );
  }

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {listRoom?.length > 6 ? listRoom?.slice(0, 6).map((imag) => <div key={imag} className="property__image-wrapper"><img className="property__image" src={imag} alt="Photo studio" /></div>) : listRoom?.map((imag) => <div key={imag} className="property__image-wrapper"><img className="property__image" src={imag} alt="Photo studio" /></div>)}
      </div>
    </div>
  );
}

export default ImageListRoom;
