import { useAppSelector } from '../../hooks';
import cn from 'classnames';
import { getSortName } from '../../store/data-process/selectors';

type SortingElemProps = {
  nameOption: string;
  clickOption(elem: string): void;
};

function SortingElem({ nameOption, clickOption }: SortingElemProps) {

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
