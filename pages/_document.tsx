import Document, { DocumentContext, Head, Main, NextScript, Html } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { AppPropsType, AppType } from "next/dist/shared/lib/utils";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: AppType) => (props: AppPropsType) => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
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
