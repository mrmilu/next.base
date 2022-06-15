## Base Mr. Milu: Next.js

### Index and features

- [Clean architecture](https://www.notion.so/mrmilu/Arquitectura-7e45973fc107487294a63bac9f5c3aa4) <-- READ THIS!
- Dependency Injection ([Inversify](https://github.com/inversify/InversifyJS))
- Typescript
- [Class transformers](https://github.com/typestack/class-transformer)
- Redux toolkit
- Apollo (GraphQL)
- [Commitlint](docs/comitlint.md) (with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config)
- [Styled components](docs/styled_components.md)
- ESLint (with TypeScript config)
- Prettier
- [Error boundary](docs/error_boundary.md)
- [i18n-next](docs/i18n_next.md) ([next-i18n official documentation](https://github.com/isaachinman/next-i18next))
- [Development proxy through rewrites](docs/dev_proxy.md)
- Sentry

### Prerequisites

This project uses the following packages

- [nvm](https://github.com/nvm-sh/nvm) (Node version manager)
- [Just](https://just.systems/man/en/chapter_4.html) (For justfile usage)

Run the following command to install the node version declared in the `.nvmrc`
file for this project:

```shell
nvm install
```

Finally, enable [corepack](https://github.com/nodejs/corepack) so the correct
version of yarn is used.

```shell
just corepack-enable
```

### First steps

**Install dependencies**

```shell
just install-deps
```

**Run project**

```shell
just dev
```

**See a list of available commands**

```shell
just
```

**Proxy commands through nvm**

```shell
just nvm-exec "yarn add @front_web_mrmilu/hooks"
```

### Environment variables

Create a `.env.development.local` file with your environment variables with the following defaults for dev server

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ANOTHER_API_URL=http://localhost:3000
NEXT_PUBLIC_GRAPHQL_PROXY_ENDPOINT=https://graphqlzero.almansi.me
NEXT_PUBLIC_REST_PROXY_ENDPOINT=https://jsonplaceholder.typicode.com
NEXT_PUBLIC_SENTRY_DSN=project_dsn
NEXT_PUBLIC_SENTRY_ENABLED=false
SENTRY_ENVIRONMENT=dev
SENTRY_URL=https://sentry.mrmilu.com
SENTRY_ORG=mrmilu
SENTRY_PROJECT=project-name
SENTRY_AUTH_TOKEN=sentry-user-auth-token
```

Also create a `.env.production.local` file with your environment variables with the following defaults for production build

```
NEXT_PUBLIC_API_URL=https://graphqlzero.almansi.me
NEXT_PUBLIC_ANOTHER_API_URL=https://jsonplaceholder.typicode.com
#NEXT_PUBLIC_SENTRY_DSN=project_dsn
NEXT_PUBLIC_SENTRY_ENABLED=false
SENTRY_ENVIRONMENT=dev
SENTRY_URL=https://sentry.mrmilu.com
SENTRY_ORG=mrmilu
SENTRY_PROJECT=project-name
SENTRY_AUTH_TOKEN=sentry-user-auth-token
```
