import { EnhancedStore } from "@reduxjs/toolkit";
import { RootState } from "@/src/ui/state";
import { setLoader } from "@/src/ui/state/ui.slice";
import RouterSingleton from "next/router";

export class AppRouterController {
  private store: EnhancedStore<RootState> | null;

  constructor(store: EnhancedStore<RootState>) {
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
    this.store?.dispatch(setLoader(true));
  };

  private handleRouteChangeComplete = () => {
    this.store?.dispatch(setLoader(false));
  };

  private handleRouteChangeError = () => {
    this.store?.dispatch(setLoader(false));
  };
}
