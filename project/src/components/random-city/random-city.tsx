import { Link } from 'react-router-dom';
import { memo } from 'react';

import { CITIES } from '../../data-store/data-const';
import { useAppDispatch } from '../../hooks/hook';
import { chooseCity } from '../../store/data-process/data-process';
import { getRandomArbitrary } from '../../utils/utils';

function RandomCity(): JSX.Element {

  const dispatch = useAppDispatch();

  const getRandomCity = (cities: string[]) => {

    const randomCaunt = getRandomArbitrary(0, cities.length);

    return cities[randomCaunt];
  };

  const cityName = getRandomCity(CITIES);

  const handleLinkUpdateCity = () => {
    dispatch(chooseCity({ cityName }));
  };

  return (
    <div className="locations__item">
      <Link to={'/'} className="locations__item-link" onClick={handleLinkUpdateCity}>
        <span>{cityName}</span>
      </Link>
    </div>
  );
}

export default memo(RandomCity);
