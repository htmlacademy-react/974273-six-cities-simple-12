import { Outlet } from 'react-router-dom';
import HeaderBody from '../header/header';

function HeaderLayout() {
  return (
    <>
      <HeaderBody />
      <Outlet />
    </>
  );
}

export default HeaderLayout;
