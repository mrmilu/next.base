# Environment variables

> ℹ️ .env variables are loaded automatically by Next.js. Refer to this documentation for more information. [Loading Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#loading-environment-variables).

> Good to know: `.env`, `.env.development`, and `.env.production` files should be included in your repository as they define defaults. .env*.local should be added to .gitignore, as those files are intended to be ignored. .env.local is where secrets can be stored.

## Values

| Key                               | Responsible | Type      | Secret | Policy                    | Default value              | Description                                                                                                                                                         | Docs                                                                                                        |
| --------------------------------- | ----------- | --------- | ------ | ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`             | DevOps      | `string`  | No     | `DEFAULT`                 | `next_base.dev.mrmilu.com` | NextJS App URL                                                                                                                                                      | -                                                                                                           |
| `NEXT_PUBLIC_REST_PROXY_ENDPOINT` | DevOps      | `string`  | No     | `REQUIRED-IN-RELEASE-ENV` | -                          | Proxy Endpoint URL                                                                                                                                                  | -                                                                                                           |
| `NEXT_PUBLIC_SENTRY_DSN`          | DevOps      | `string`  | No     | `REQUIRED-IN-RELEASE-ENV` | -                          | Sentry DSN                                                                                                                                                          | [Sentry DSN](https://docs.sentry.io/concepts/key-terms/dsn-explainer/)                                      |
| `NEXT_PUBLIC_SENTRY_ENABLED`      | DevOps      | `boolean` | No     | `FEATURE-FLAG`            | -                          | Enables/Disables Sentry monitoring                                                                                                                                  | -                                                                                                           |
| `SENTRY_URL`                      | DevOps      | `string`  | No     | `REQUIRED-IN-RELEASE-ENV` | -                          | The base URL of your Sentry instance.                                                                                                                               | [Sentry Webpack Plugin Options (url)](https://www.npmjs.com/package/@sentry/webpack-plugin#url)             |
| `SENTRY_ORG`                      | DevOps      | `string`  | No     | `REQUIRED-IN-RELEASE-ENV` | -                          | The slug of the Sentry organization associated with the app.                                                                                                        | [Sentry Webpack Plugin Options (org)](https://www.npmjs.com/package/@sentry/webpack-plugin#org)             |
| `SENTRY_PROJECT`                  | DevOps      | `string`  | No     | `REQUIRED-IN-RELEASE-ENV` | -                          | The slug of the Sentry project associated with the app.                                                                                                             | [Sentry Webpack Plugin Options (project)](https://www.npmjs.com/package/@sentry/webpack-plugin#project)     |
| `SENTRY_AUTH_TOKEN`               | DevOps      | `string`  | Yes    | `REQUIRED-IN-RELEASE-ENV` | -                          | The authentication token to use for all communication with Sentry. Can be obtained from https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/. | [Sentry Webpack Plugin Options (authToken)](https://www.npmjs.com/package/@sentry/webpack-plugin#authtoken) |


## Policies
- `DEFAULT`: This environment variable has a default value that works on most common usages
- `REQUIRED`: This environment variable must be set, otherwise the application will not start throwing an exception
- `REQUIRED-IN-RELEASE-ENV`: This environment variable must be set in release environments, the application will start but won't comply requirements: security, functionality, integration, performance, etc
- `FEATURE-FLAG`: This environment variable changes a feature behavior 
- `DEPRECATED`: Deprecated variables, see deprecated variables section

## Types
- `boolean`: string variable containing a boolean value 
- `string`: string variable
- `fs_path`: string variable containing a path in the file system
- `email`: string variable containing an email
- `string-list-by-comma`: list string values extracted by: split (using `,` as the separator) and trim
