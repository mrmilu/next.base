import type { Store } from "@reduxjs/toolkit";
import { setLoader } from "@/src/ui/state/ui.slice";
import RouterSingleton from "next/router";

export class AppRouterController {
  private store!: Store;

  constructor(store: Store) {
    this.store = store;
    this.init();
  }

  dispose() {
    RouterSingleton.events.off("routeChangeStart", this.handleRouteChangeStart);
    RouterSingleton.events.off("routeChangeComplete", this.handleRouteChangeComplete);
    RouterSingleton.events.off("routeChangeError", this.handleRouteChangeError);
  }

  private init() {
    RouterSingleton.events.on("routeChangeStart", this.handleRouteChangeStart);
    RouterSingleton.events.on("routeChangeComplete", this.handleRouteChangeComplete);
    RouterSingleton.events.on("routeChangeError", this.handleRouteChangeError);
  }

  private handleRouteChangeStart = () => {
    console.log("Route change start")
    this.store.dispatch(setLoader(true));
  };

  private handleRouteChangeComplete = () => {
    console.log("Route change complete")
    this.store.dispatch(setLoader(false));
  };

  private handleRouteChangeError = () => {
    this.store.dispatch(setLoader(false));
  };
}
