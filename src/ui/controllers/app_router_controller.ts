import type { Store } from "@reduxjs/toolkit";
import { setLoader } from "@/src/ui/state/ui.slice";
import RouterSingleton from "next/router";

export class AppRouterController {
  private store!: Store;

  constructor(store: Store) {
    this.store = store;
    this.init();
  }
  private init() {
    RouterSingleton.events.on("routeChangeStart", this.handleRouteChangeStart);
    RouterSingleton.events.on("routeChangeComplete", this.handleRouteChangeComplete);
    RouterSingleton.events.on("routeChangeError", this.handleRouteChangeError);
  }

  private handleRouteChangeStart = () => {
    this.store.dispatch(setLoader(true));
  };

  private handleRouteChangeComplete = () => {
    this.store.dispatch(setLoader(false));
  };

  private handleRouteChangeError = () => {
    this.store.dispatch(setLoader(false));
  };
}
