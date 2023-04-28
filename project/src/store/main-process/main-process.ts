import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../data-store/data-variables';
import { MARKER_OUT } from '../../data-store/data-const';
import { MainProcess } from '../../types/state';

const initialState: MainProcess = {
  markerColor: MARKER_OUT,
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    changeColorMarker: (state, action: PayloadAction<number>) => {
      const markerId = action.payload;
      state.markerColor = markerId;
    }
  }
});

export const { changeColorMarker } = mainProcess.actions;
