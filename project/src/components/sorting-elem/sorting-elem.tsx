import { useAppSelector } from '../../hooks';
import cn from 'classnames';

type SortingElemProps = {
  nameOption: string;
  clickOption(elem: string): void;
};

function SortingElem({ nameOption, clickOption }: SortingElemProps) {

  const chooseOption = useAppSelector((state) => state.sortName);

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
