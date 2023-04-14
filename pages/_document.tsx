import "@/src/core/app/ioc/index";
import type { DocumentContext } from "next/document";
import Document, { Head, Main, NextScript, Html } from "next/document";
import { ServerStyleSheet } from "styled-components";
import type { AppPropsType, AppType } from "next/dist/shared/lib/utils";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp:
            (App: AppType) =>
              ({ pageProps, ...restProps }: AppPropsType) => {

                return sheet.collectStyles(
                  <App { ...restProps } pageProps={pageProps} />
                );
              }
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styled-sheets">
            { initialProps.styles }
            { sheet.getStyleElement() }
          </React.Fragment>
        ]
      };
    } finally {
      sheet.seal();
    }
  }

  render () {
    return (
      <Html>
        <Head>
          <link rel="preload" href="/assets/fonts/Lato-Regular.ttf" as="font" type="font/truetype" />
          <link rel="preload" href="/assets/fonts/Lato-Bold.ttf" as="font" type="font/truetype" />
          <link rel="preload" href="/assets/fonts/Lato-Light.ttf" as="font" type="font/truetype" />
        </Head>
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
