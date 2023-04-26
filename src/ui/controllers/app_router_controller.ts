import type { Store } from "@reduxjs/toolkit";
import RouterSingleton from "next/router";
import { uiProvider } from "@/src/ui/providers/ui.provider";

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
    this.setLoader(true);
  };

  private handleRouteChangeComplete = () => {
    this.setLoader(false);
  };

  private handleRouteChangeError = () => {
    this.setLoader(false);
  };

  private setLoader (state: boolean) {
    const uiState = uiProvider.getState();
    uiState.setLoader(state);
  }
}
