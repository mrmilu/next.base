## Base Mr. Milu: Next.js

### Index

- [Getting started](#getting-started---dockerized-environment)
- [Next app readme](app/README.md#nextjs-app-readme)

> ### Mac users
> In order to run this project in a dockerized environment a
> Docker experimental features must be enabled. Follow this [link](https://www.docker.com/blog/speed-boost-achievement-unlocked-on-docker-desktop-4-6-for-mac/)
>  to enable **virtiofs**. Without enabling this feature developing front end
> web apps in a macOS machines in a dockerized environment it's practically
> impossible. To enable this feature macOS 12.2+ for Apple Silicon and
> macOS 12.3+ for Intel is needed. If are not able to meet these requirements please
> follow the guide for [local development environment](app/README.md#local-development).

### Prerequisites

This project uses the following packages

- [nvm](https://github.com/nvm-sh/nvm) (Node version manager)
- [Just](https://just.systems/man/en/chapter_4.html) (For justfile usage)

### Getting started - (Dockerized environment)

First add the corresponding environment variables to your Next.js `app` folder (check the
[app readme](app/README.md#environment-variables-for-all-environments---local-or-dockerized)).

To run the project in dockerized environment run the following command:

```shell
# If is the first time running this container it will build the
# docker image and then run the Next.js service
just start
```

For a list of all available commands run:

```shell
just # this will list all available commands in the just file
```