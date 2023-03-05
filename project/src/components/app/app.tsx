import React from 'react';
import HeaderBody from '../../pages/header/header';
import MainFull from '../../pages/main-full/main-full';
// import NoPlace from '../../pages/no-place/no-place';
// import PrivateOffice from '../../pages/private-office/private-office';
// import Room from '../../pages/room/room';

type AppMainBodyProps = {
  totalNumberOffers: number;
  rentAmsterdam: { price: number }[];
}

function App(props: AppMainBodyProps): JSX.Element {
  return (
    <React.Fragment>
      <HeaderBody />
      <MainFull totalNumberOffers={props.totalNumberOffers} rentAmsterdam={props.rentAmsterdam} />
    </React.Fragment>
  );
}

export default App;
