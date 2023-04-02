import { Outlet } from 'react-router-dom';
import ListSities from '../list-sities/list-cities';

function MainMenu() {

  return (
    <>
      <div className="tabs">
        <section className="locations container">
          <ListSities />
        </section>
      </div>
      <Outlet />
    </>
  );
}

export default MainMenu;
