import "@/src/dependencies/ioc/index";
import "@/src/ui/styles/globals.scss";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useRef } from "react";
import { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "@/src/ui/state";
import { appWithTranslation } from "next-i18next";
import { MyMainLoader } from "@/src/ui/components/my_main_loader/my_main_loader";
import { AppRouterController } from "@/src/ui/controllers/app_router_controller";

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
      <>
        <MyMainLoader />
        {getLayout(<Component {...pageProps} />)}
      </>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
