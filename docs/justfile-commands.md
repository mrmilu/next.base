# Justfile Commands 🦀 🚀

Run `just` to display the list of available commands.

## What is just?

`just` is a handy way to save and run project-specific commands. Commands, called recipes, are stored in a file called `justfile` with syntax inspired by `make`.

## Commands List

- `just corepack-enable`: Enables Corepack in Node.js.
- `just install-deps`: Installs the dependencies listed in the project's package.json.
- `just dev`: Starts the Next.js development server.
- `just build`: Builds the Next.js application.
- `just start`: Starts the server for the built Next.js application.
- `just fix`: Runs linting and formatting.
- `just ioc-generate`: Generates Inversify bindings.
- `just ioc-generate-watch`: Generates Inversify bindings and watches for changes.
- `just commit`: Commits changes using commitlint
- `just nvm exec {{command}}`: Proxies a command through nvm. Replace `{{command}}` with the desired command to execute.

