import { NameSpace } from '../../data-store/data-variables';
import { State } from '../../types/state';

export const getMarkerColor = (state: State): number => state[NameSpace.Main].markerColor;
