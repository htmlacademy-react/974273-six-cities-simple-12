import { Outlet } from 'react-router-dom';
import HeaderBody from '../header/header';

function Layout() {
  return (
    <>
      <HeaderBody />
      <Outlet />
    </>
  );
}

export default Layout;
