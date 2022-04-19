import type { RootState } from "./index";
import type { UserSliceState } from "@/src/ui/view_models/user.slice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { CookieUtils } from "@/src/common/utils/cookie";

const initialState = (): UserSliceState => ({
  logged: false
});

export const loginThunk = createAsyncThunk("user.slice/login", async (arg, { dispatch }) => {
  CookieUtils.setCookie("logged", "true"); // For example purpose this is not in a use case, but it should be
  dispatch(setLogged(true));
});

export const logoutThunk = createAsyncThunk("user.slice/logout", async (arg, { dispatch }) => {
  CookieUtils.eraseCookie("logged"); // For example purpose this is not in a use case, but it should be
  dispatch(setLogged(false));
});

const userSlice = createSlice({
  name: "user.slice",
  initialState: initialState(),
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    }
  }
});

function selectUiBase(state: RootState) {
  return state.user;
}

export const getLoggedState = createSelector([selectUiBase], (slice) => {
  let loggedCookie;
  if (typeof window !== "undefined") loggedCookie = CookieUtils.getCookie("logged");
  // console.log((Boolean(loggedCookie) && loggedCookie === "true") || slice.logged);
  return (Boolean(loggedCookie) && loggedCookie === "true") || slice.logged;
});
export const { setLogged } = userSlice.actions;
export default userSlice.reducer;