/* eslint-disable @typescript-eslint/no-var-requires */
import "@/src/core/app/ioc/__generated__";
import "@/src/common/utils/yup-extensions";
import "@/src/ui/styles/globals.css";
import "@/src/ui/styles/fonts.css";
import "@/src/ui/styles/reset.css";
import React from "react";
import { theme } from "@/src/ui/styles/theme.css";
import type { PropsWithChildren } from "react";
import { MainLoader } from "@/src/ui/components/main-loader/main-loader";
import { Modal } from "@/src/ui/components/modal/modal";
import type { Metadata, Viewport } from "next";
import type { LocaleParams } from "@/src/ui/view-models/params-view-model";
import { BaseLayout } from "@/src/ui/components/base-layout/base-layout";
import { locales } from "@/src/ui/i18n";
import { unstable_setRequestLocale } from "next-intl/server";

// Conditionally inject axe into the page.
// This only happens outside of production and in a browser (not SSR).
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const ReactDOM = require("react-dom");
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Next boilerplate app"
};
export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 2,
  width: "device-width"
};

export default function RootLayout({ children, params: { locale } }: PropsWithChildren<LocaleParams>) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <html lang={locale}>
        <head>
          {process.env.NODE_ENV === "production" && (
            <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; child-src 'none'; style-src 'unsafe-inline'; object-src 'none'" />
          )}
          <meta httpEquiv="referrer" content="no-referrer, strict-origin-when-cross-origin" />
        </head>
        <body className={theme}>
          <Modal />
          <MainLoader />
          <BaseLayout>{children}</BaseLayout>
        </body>
      </html>
    </>
  );
}
