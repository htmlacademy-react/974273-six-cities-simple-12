// NOTE: HOC - функция высшего порядка. Эта функция, которая принимает в качестве аргумента другую функцию и возвращает некий результат.
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { State, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
