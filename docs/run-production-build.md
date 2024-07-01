# Run production build

> ⚠️ You must have an `.env.production.local` in order to build a production build.

First generate the dependency injection files:
```shell
just ioc-generate
```

Next run a production build:

```shell
just build
```

Finally execute Next.js server:

- Default Next.js build
    ```shell
    just start
    ```
- Standalone build (output: standalone)
    ```shell
    node .next/standalone/server.js
    ```

