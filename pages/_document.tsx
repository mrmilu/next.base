import "@/src/core/app/ioc/index";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { theme } from "@/src/ui/styles/theme.css";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head />
        <body className={theme}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
