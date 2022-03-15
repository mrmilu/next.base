import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { DummySliceState } from "@/src/ui/features/dummy/view_models/dummy.slice";
import { RootState } from "@/src/ui/state";
import { setLoader } from "@/src/ui/state/ui.slice";
import { locator } from "@/src/core/app/ioc";
import { DummyRepositoryProvider } from "@/src/core/dummy/domain/interfaces/dummy_repository";
import { TYPES } from "@/src/core/app/ioc/types";

const initialState = (): DummySliceState => ({
  users: [],
  loading: false
});

export const getUsersThunk = createAsyncThunk("dummy.slice/getUsers", async (arg, { dispatch }) => {
  dispatch(setLoader(true));
  try {
    const dummyRepository = await locator.get<DummyRepositoryProvider>(TYPES.IDummyRepository)();
    return dummyRepository.users();
  } finally {
    dispatch(setLoader(false));
  }
});

const uiSlice = createSlice({
  name: "ui.slice",
  initialState: initialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    });
    builder.addCase(getUsersThunk.pending, (state, { payload }) => {
      state.loading = true;
    });
  }
});

function selectDummyBase(state: RootState) {
  return state.dummy;
}

export const getUsers = createSelector([selectDummyBase], (slice) => slice.users);
export const getLoadingState = createSelector([selectDummyBase], (slice) => slice.loading);

export default uiSlice.reducer;
