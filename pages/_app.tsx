import "@/src/core/app/ioc/index";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { useEffect } from "react";
import type { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "@/src/ui/state";
import { appWithTranslation } from "next-i18next";
import { MainLoader } from "@/src/ui/components/main_loader/main_loader";
import { AppRouterController } from "@/src/ui/controllers/app_router_controller";
import { GlobalStyles } from "@/src/ui/styles/globals";
import { Modal } from "@/src/ui/components/modal/modal";
import Head from "next/head";

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
      <Head>
        <title>Next boilerplate app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; child-src 'none'; style-src 'unsafe-inline'; object-src 'none'" />
        )}
        <meta httpEquiv="referrer" content="no-referrer, strict-origin-when-cross-origin" />
      </Head>
      <GlobalStyles />
      <Modal />
      <MainLoader />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}

export default appWithTranslation(MyApp);
