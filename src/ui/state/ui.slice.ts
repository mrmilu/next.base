import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";
import { UiSliceState } from "../view_models/ui.slice";

const initialState = (): UiSliceState => ({
  showLoader: false
});

const uiSlice = createSlice({
  name: "ui.slice",
  initialState: initialState(),
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.showLoader = action.payload;
    }
  }
});

function selectUiBase(state: RootState) {
  return state.ui;
}

export const getLoaderState = createSelector([selectUiBase], (ui) => ui.showLoader);

export const { setLoader } = uiSlice.actions;
export default uiSlice.reducer;
