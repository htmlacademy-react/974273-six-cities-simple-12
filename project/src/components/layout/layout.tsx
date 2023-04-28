import { Outlet } from 'react-router-dom';

import HeaderBody from '../header/header';

function Layout(): JSX.Element {
  return (
    <>
      <HeaderBody />
      <Outlet />
    </>
  );
}

export default Layout;
