import RouterSingleton from "next/router";
import type { UiStateViewModel } from "@/src/ui/view_models/ui_state";

export class AppRouterController {
  private uiState!: UiStateViewModel;

  constructor(uiState: UiStateViewModel) {
    this.uiState = uiState;
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

  private setLoader(state: boolean) {
    this.uiState.setLoader(state);
  }
}
