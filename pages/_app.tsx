/* eslint-disable @typescript-eslint/no-var-requires */
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import type { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import { MainLoader } from "@/src/ui/components/main_loader/main_loader";
import { Modal } from "@/src/ui/components/modal/modal";
import Head from "next/head";
import "@/src/common/utils/yup_extensions";
import "@/src/ui/styles/globals.css";
import "@/src/ui/styles/fonts.css";
import "@/src/ui/styles/reset.css";
import { AppRouterController } from "@/src/ui/controllers/app_router_controller";
import { uiProvider } from "@/src/ui/providers/ui.provider";

// Conditionally inject axe into the page.
// This only happens outside of production and in a browser (not SSR).
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const ReactDOM = require("react-dom");
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

new AppRouterController(uiProvider.getState());

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Next boilerplate app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
        {process.env.NODE_ENV === "production" && (
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; child-src 'none'; style-src 'unsafe-inline'; object-src 'none'" />
        )}
        <meta httpEquiv="referrer" content="no-referrer, strict-origin-when-cross-origin" />
      </Head>
      <Modal />
      <MainLoader />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default appWithTranslation(MyApp);
