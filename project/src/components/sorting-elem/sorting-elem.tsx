import cn from 'classnames';

import { useAppSelector } from '../../hooks/hook';
import { getSortName } from '../../store/data-process/selectors';
import { SortingElemProps } from '../../types/type-store';

function SortingElem({ nameOption, clickOption }: SortingElemProps): JSX.Element {

  const chooseOption = useAppSelector(getSortName);

  return (
    <li
      className={cn(
        'places__option',
        { 'places__option--active': chooseOption === nameOption }
      )}
      tabIndex={0}
      onClick={() => clickOption(nameOption)}
    >
      {nameOption}
    </li>
  );
}

export default SortingElem;
