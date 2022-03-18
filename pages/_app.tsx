import "@/src/core/app/ioc/index";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "@/src/ui/state";
import { appWithTranslation } from "next-i18next";
import { MainLoader } from "@/src/ui/components/main_loader/main_loader";
import { AppRouterController } from "@/src/ui/controllers/app_router_controller";
import { GlobalStyles } from "@/src/ui/styles/globals";
import { Modal } from "@/src/ui/components/modal/modal";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const appRouterController = new AppRouterController(store);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    return () => {
      appRouterController.dispose();
    };
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <Modal />
      <MainLoader />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default appWithTranslation(MyApp);
