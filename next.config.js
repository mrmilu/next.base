/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import("next").NextConfig} */
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const { withSentryConfig } = require("@sentry/nextjs");
const createNextIntlPlugin = require("next-intl/plugin");

const withVanillaExtract = createVanillaExtractPlugin();
const withNextIntl = createNextIntlPlugin("./src/shared/presentation/i18n/index.ts");

const {
  NEXT_PUBLIC_SENTRY_ENABLED,
  NODE_ENV,
  NEXT_PUBLIC_API_URL,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  SENTRY_URL,
  BUNDLE_ANALYZER_ENABLED
} = process.env;

const apiDomain = NODE_ENV !== "production" ? "next_base.dev.mrmilu.com" : NEXT_PUBLIC_API_URL?.replace("https://", "") ?? "";

const nextConfig = {
  eslint: {
    dirs: ["app", "src"]
  },
  reactStrictMode: false,
  images: {
    domains: [apiDomain]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          }
        ]
      }
    ];
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"]
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  }
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  url: SENTRY_URL,
  org: SENTRY_ORG,
  project: SENTRY_PROJECT,
  authToken: SENTRY_AUTH_TOKEN
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
const wrappedConfig =
  NEXT_PUBLIC_SENTRY_ENABLED === "true"
    ? withNextIntl(withVanillaExtract(withSentryConfig(nextConfig, sentryWebpackPluginOptions)))
    : withNextIntl(withVanillaExtract(nextConfig));
module.exports = BUNDLE_ANALYZER_ENABLED === "true" ? withBundleAnalyzer(wrappedConfig) : wrappedConfig;
