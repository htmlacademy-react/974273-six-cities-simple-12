import { Link } from 'react-router-dom';
import { CITIES } from '../../data-store/data-const';
import { useAppDispatch } from '../../hooks';
import { chooseCity } from '../../store/data-process/data-process';
import { getRandomArbitrary } from '../../utils/utils';
import { memo } from 'react';

function RandomCity(): JSX.Element {

  const dispatch = useAppDispatch();

  const getRandomCity = (cities: string[]) => {

    const randomCaunt = getRandomArbitrary(0, cities.length);

    return cities[randomCaunt];
  };

  const cityName = getRandomCity(CITIES);

  const updateCity = () => {
    dispatch(chooseCity({ cityName }));
  };

  return (
    <div className="locations__item">
      <Link to={'/'} className="locations__item-link" onClick={updateCity}>
        <span>{cityName}</span>
      </Link>
    </div>
  );
}

export default memo(RandomCity);
