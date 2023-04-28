import { CITIES } from '../../data-store/data-const';
import { useAppDispatch } from '../../hooks/hook';
import { chooseCity } from '../../store/data-process/data-process';

import CityItem from '../city-item/city-item';

function ListSities(): JSX.Element {

  const dispatch = useAppDispatch();
  const clickCity = (city: string) => {

    const cityName = city;

    if (!cityName) {
      return;
    }
    dispatch(chooseCity({ cityName }));
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((location, index) => <CityItem key={location} city={location} clickCity={(city) => clickCity(city)} />)}
    </ul>
  );
}

export default ListSities;
