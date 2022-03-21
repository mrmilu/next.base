## Base Mr. Milu Next.js

### Index and features

- Clean architecture
- Dependency Injection ([Inversify](https://github.com/inversify/InversifyJS))
- Typescript
- [Class transformers](https://github.com/typestack/class-transformer)
- Redux toolkit
- Apollo (GraphQL)
- SCSS
- [Commitlint](docs/comitlint.md) (with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config)
- Stylelint
- ESLint (with TypeScript config)
- Prettier
- [i18n-next](docs/i18n-next.md) ([next-i18n oficial documentation](https://github.com/isaachinman/next-i18next))

### First steps

**Set node version**

```
nvm use
```

**Install dependencies**

```
yarn
```

**Run project**

```
yarn dev
```

### Environment variables

Create a `.env.local` file with your environment variables with the following defaults

```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_DEV_GRAPHQL_PROXY_ENDPOINT=https://graphqlzero.almansi.me/api
NEXT_PUBLIC_SENTRY_DSN=project_dsn
NEXT_PUBLIC_SENTRY_ENABLED=false
SENTRY_ENVIRONMENT=dev
SENTRY_URL=https://sentry.mrmilu.com
SENTRY_ORG=mrmilu
SENTRY_PROJECT=project-name
SENTRY_AUTH_TOKEN=sentry-user-auth-token
```
