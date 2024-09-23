/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UserStateViewModel } from "@/src/users/presentation/view-models/user-state";
import { CookieUtils } from "@front_web_mrmilu/utils";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

export const userStore = createStore<UserStateViewModel>()(
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

export function useUserStore(): UserStateViewModel;
export function useUserStore<T>(selector: (state: UserStateViewModel) => T, equals?: (a: T, b: T) => boolean): T;
export function useUserStore(selector?: any, equals?: any) {
  return useStore(userStore, selector, equals);
}
