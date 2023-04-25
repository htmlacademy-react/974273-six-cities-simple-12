import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import { CityItemProps } from '../../types/type-store';
import { getCity } from '../../store/data-process/selectors';

function CityItem({ city, clickCity }: CityItemProps) {

  const cityChoose = useAppSelector(getCity);

  return (
    <li
      className="locations__item"
      onClick={() => clickCity(city)}
    >
      <Link to={'/'} id={city} className={cn(
        'locations__item-link',
        { 'tabs__item': city !== cityChoose },
        { 'tabs__item--active': city === cityChoose }
      )}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default CityItem;
