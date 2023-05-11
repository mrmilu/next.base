/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserState } from "@/src/ui/view_models/user.slice";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export const userProvider = createStore<UserState>()(
  immer((set, get) => ({
    logged: false,
    setLogged(logged: boolean) {
      set((state) => {
        state.logged = logged;
      });
    },
    login() {
      CookieUtils.setCookie("logged", "true"); // For example purpose this is not in a use case, but it should be
      get().setLogged(true);
    },
    logout() {
      CookieUtils.eraseCookie("logged"); // For example purpose this is not in a use case, but it should be
      get().setLogged(false);
    }
  }))
);

export function useUserProvider(): UserState;
export function useUserProvider<T>(selector: (state: UserState) => T, equals?: (a: T, b: T) => boolean): T;
export function useUserProvider(selector?: any, equals?: any) {
  return useStore(userProvider, selector, equals);
}
