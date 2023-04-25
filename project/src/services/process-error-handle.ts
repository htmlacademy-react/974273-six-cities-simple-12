import { TIMEOUT_SHOW_ERROR } from '../data-store/data-const';
import { store } from '../store';
import { clearErrorAction, setError } from '../store/data-process/data-process';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));

  setTimeout(
    () => store.dispatch(clearErrorAction()),
    TIMEOUT_SHOW_ERROR,
  );
};
