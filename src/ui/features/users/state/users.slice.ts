import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/src/ui/state";
import { locator } from "@/src/core/app/ioc";
import { TYPES } from "@/src/core/app/ioc/types";
import type { IocProvider } from "@/src/core/app/ioc/interfaces";
import type { GetUsersUseCase } from "@/src/core/users/domain/use_cases/get_users_use_case";
import type { UsersSliceState } from "@/src/ui/features/users/view_models/users.slice";
import { uiProvider } from "@/src/ui/providers/ui.provider";

const initialState = (): UsersSliceState => ({
  users: [],
  loading: false
});

export const getUsersThunk = createAsyncThunk("users.slice/getUsers", async (arg, { dispatch }) => {
  const uiState = uiProvider.getState();
  uiState.setLoader(true);
  try {
    const getUsersUseCase = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
    return getUsersUseCase.execute().finally(() => {
      uiState.setLoader(false);
    });
  } catch (e) {
  }
});

const usersSlice = createSlice({
  name: "ui.slice",
  initialState: initialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      if (payload) state.users = payload;
    });
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
    });
  }
});

function selectUsersBase (state: RootState) {
  return state.users;
}

export const getUsers = createSelector([ selectUsersBase ], (slice) => slice.users);
export const getLoadingState = createSelector([ selectUsersBase ], (slice) => slice.loading);

export default usersSlice.reducer;
