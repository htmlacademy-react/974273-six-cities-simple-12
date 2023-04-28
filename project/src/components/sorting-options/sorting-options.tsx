import { optionsSorting } from '../../data-store/data-variables';
import { useAppDispatch } from '../../hooks/hook';
import { chooseOption, isOpenSort } from '../../store/data-process/data-process';

import SortingElem from '../sorting-elem/sorting-elem';

function SortingOptions(): JSX.Element {

  const dispatch = useAppDispatch();

  const clickOption = (sort: string): void => {

    const nameOption = sort;

    dispatch(chooseOption({ nameOption }));
    dispatch(isOpenSort());
  };

  return (
    <ul className="places__options places__options--custom places__options--opened">
      {optionsSorting.map((item) => <SortingElem key={item} nameOption={item} clickOption={(sort: string) => clickOption(sort)} />)}
    </ul>
  );
}

export default SortingOptions;
